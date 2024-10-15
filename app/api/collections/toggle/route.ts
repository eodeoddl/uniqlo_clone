import { toggleCollection } from '@/actions/handleCollection';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { collectionId, photoId } = await request.json();
    await toggleCollection(collectionId, photoId);
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: '컬렉션 업데이트 실패' },
      { status: 500 }
    );
  }
}
