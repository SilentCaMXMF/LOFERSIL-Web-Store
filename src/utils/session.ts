import { crypto } from 'https://deno.land/std@0.208.0/crypto/mod.ts';

interface Session {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

export class SessionManager {
  private sessions: Map<string, Session> = new Map();
  private readonly sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

  createSession(userId: string): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const sessionId = Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    const session: Session = {
      id: sessionId,
      userId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + this.sessionDuration),
    };

    this.sessions.set(sessionId, session);
    return sessionId;
  }

  getSession(sessionId: string): Session | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    if (new Date() > session.expiresAt) {
      this.sessions.delete(sessionId);
      return undefined;
    }

    return session;
  }

  deleteSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  cleanupExpiredSessions(): void {
    const now = new Date();
    for (const [id, session] of this.sessions.entries()) {
      if (now > session.expiresAt) {
        this.sessions.delete(id);
      }
    }
  }
}
