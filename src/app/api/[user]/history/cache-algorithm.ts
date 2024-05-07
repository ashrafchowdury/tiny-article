import cache from "@/libs/cache";
import { POST_TYPE } from "@/utils/types";

// constants
const DATA_EXPIRE = 86400; // 24 hours in seconds

// Create new posts batch
export const createNewPostsBatch = async (userId: string, data: POST_TYPE[]) => {
  const CURRENT_TIME = Math.floor(Date.now() / 1000); // Get current time in seconds
  const KEY = `user:${userId}:${CURRENT_TIME}`; // Generate unique key for data batch

  try {
    await cache.json.set(KEY, "$", data);
    await cache.expire(KEY, DATA_EXPIRE);

    await cache.hset(`user:${userId}:batches`, { [KEY]: CURRENT_TIME });
    await cache.expire(`user:${userId}:batches`, DATA_EXPIRE);

    return data;
  } catch (error) {
    throw new Error("Encounter error while triyng to save new posts");
  }
};

// Update post batch by adding new posts
export const updatePostsBatch = async (batchKey: string, data: POST_TYPE[], userId: string) => {
  try {
    await cache.json.arrinsert(batchKey, "$", 0, ...data);
    await cache.expire(`user:${userId}:batches`, DATA_EXPIRE);

    return data;
  } catch (error) {
    throw new Error("Encounter error while triyng to update posts");
  }
};

// Check if their is any recent saves are made
export const isRecentBatch = async (userId: string) => {
  const CURRENT_TIME = Math.floor(Date.now() / 1000); // Get current time in seconds
  const HOURS = 43200; // 12 hours in seconds

  try {
    const batches = await cache.hkeys(`user:${userId}:batches`);

    if (batches.length == 0) {
      return null; // batch not found
    }

    // Check each batch key's creation time
    for (const batchKey of batches) {
      const batchCreationTime = (await cache.hget(`user:${userId}:batches`, batchKey)) as number;

      if (CURRENT_TIME - batchCreationTime < HOURS) {
        return batchKey; // User has a recent batch
      }
    }

    return null; // No recent batch found
  } catch (error) {
    throw new Error("Encounter error while triyng find recent post batchs");
  }
};

// Cache all posts
export async function cachePosts(userId: string, data: POST_TYPE[]) {
  // Check if user has recent batch
  const hasRecent = await isRecentBatch(userId);

  // If user has recent batch, add data to that batch
  if (hasRecent) {
    const updateBatch = await updatePostsBatch(hasRecent, data, userId);
    return updateBatch;
  }

  // create new batch
  const createBatch = await createNewPostsBatch(userId, data);

  return createBatch;
}

// Get all posts from cache
export const getPostBatches = async (userId: string) => {
  try {
    const batches = await cache.hkeys(`user:${userId}:batches`);

    if (batches.length > 0) {
      if (batches.length == 1) {
        const posts = await cache.json.get(batches[0], "$");
        return posts;
      } else {
        const all_posts: any = await cache.json.mget(batches, "$");
        return all_posts.flat().flatMap((posts: any) => posts);
      }
    } else {
      return [];
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Something went wrong, can't access to posts data");
  }
};
