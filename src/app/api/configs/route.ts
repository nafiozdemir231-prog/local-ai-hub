import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/config';
import { prisma } from '@/lib/db/client';
import { shareConfigSchema } from '@/lib/utils/validators';
import { isAdmin } from '@/lib/utils/admin';

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    console.log('[CONFIGS_GET] session.user.id:', userId);

    let configs;
    if (userId && await isAdmin(userId)) {
      configs = await prisma.lLMConfig.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true, role: true } },
          votes: true,
        },
      });
    } else {
      configs = await prisma.lLMConfig.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true } },
          votes: true,
        },
      });
    }
    
    // users tablosunda olmayan kullanıcılar için null kontrolü
    const sanitizedConfigs = configs.map(config => ({
      ...config,
      user: config.user || { id: null, name: null, email: null },
    }));
    
    return NextResponse.json({ success: true, data: sanitizedConfigs });
  } catch (error) {
    console.error('[CONFIGS_GET]', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    console.log('[CONFIGS_POST] === SESSION ===');
    console.log('user:', session?.user);
    console.log('user.id:', session?.user?.id);
    console.log('user.email:', session?.user?.email);
    console.log('user.name:', session?.user?.name);
    console.log('user.provider:', session?.user?.provider);
    
    if (!session?.user?.id) {
      console.log('[CONFIGS_POST] NO USER ID!');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = session.user.id;
    console.log('[CONFIGS_POST] Using userId:', userId);
    
    const body = await request.json();
    const result = shareConfigSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten() }, { status: 400 });
    }
    
    // User'ın DB'de var olduğundan emin ol
    const userCheck = await prisma.user.findFirst({
      where: { id: userId },
      select: { id: true },
    });
    console.log('[CONFIGS_POST] userCheck:', userCheck);
    
    if (!userCheck) {
      // User oluştur
      const newUser = await prisma.user.create({
        data: {
          id: userId,
          email: session.user.email || 'unknown@local',
          name: session.user.name || 'Anonymous',
          role: 'user',
          provider: session.user.provider || 'oauth',
        },
      });
      console.log('[CONFIGS_POST] Created user:', newUser.id);
    }
    
    console.log('[CONFIGS_POST] Creating config with userId:', userId);
    
    const config = await prisma.lLMConfig.create({
      data: { ...result.data, userId },
    });
    
    console.log('[CONFIGS_POST] Config created:', config.id);
    
    await prisma.modelRating.upsert({
      where: {
        userId_modelName_category: {
          userId: userId,
          modelName: result.data.modelName,
          category: "Intelligence",
        },
      },
      update: { rating: { increment: 0 } },
      create: {
        userId: userId,
        modelName: result.data.modelName,
        configId: config.id,
        category: "Intelligence",
        rating: 0,
      },
    });
    
    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    console.error('[CONFIGS_POST]', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
