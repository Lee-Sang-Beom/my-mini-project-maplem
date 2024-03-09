export const dynamic = 'auto'; // todo

import { authOptions } from '@/lib/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
