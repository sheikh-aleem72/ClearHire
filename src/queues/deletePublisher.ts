import IORedis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { env } from '../config/serverConfig';

// Redis client used to publish cleanup jobs
const redis = new IORedis(env.REDIS_URL);

// Queue name for delete-related background jobs
const DELETE_QUEUE = env.DELETE_QUEUE_NAME;

/**
 * Publish a cleanup/delete job to the Redis-backed RQ queue.
 * Returns the generated queue task ID.
 */
export async function publishRQDeleteJob(jobId: string) {
  // Unique identifier for the queued task
  const queueTaskId = uuidv4();

  // Serialize the job payload that will be stored in Redis
  const payload = JSON.stringify({
    jobId,
  });

  // Store job metadata in Redis hash
  await redis.hmset(`rq:job:${queueTaskId}`, {
    data: payload,
    status: 'queued',
    description: `Cleanup Job ${jobId}`,
    attempts: '0',
  });

  // Enqueue the task ID so the worker can pick it up
  await redis.lpush(`rq:queue:${DELETE_QUEUE}`, queueTaskId);

  console.log(`🗑 Cleanup Job queued : ${jobId}`);

  return queueTaskId;
}
