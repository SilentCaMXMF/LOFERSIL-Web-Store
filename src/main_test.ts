import { assertEquals } from 'https://deno.land/std@0.208.0/testing/asserts.ts';
import { superoak } from 'https://deno.land/x/superoak@4.7.0/mod.ts';
import { app } from './main.ts';

Deno.test({
  name: 'health check returns healthy status',
  async fn() {
    const request = await superoak(app);
    await request.get('/health')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        assertEquals(res.body.status, 'healthy');
      });
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: 'home page returns 200',
  async fn() {
    const request = await superoak(app);
    await request.get('/')
      .expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
