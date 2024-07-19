import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
} from "microcms-js-sdk";

export type Blog = {
  id: string;
  title: string;
  content: string;
  eyeCatch: MicroCMSImage;
} & MicroCMSDate;

if (!process.env.NEXT_PUBLIC_CMS_URL || !process.env.NEXT_PUBLIC_CMS_API_KEY || !process.env.NEXT_PUBLIC_CMS_CATEGORY) {
  throw new Error("Please set NEXT_PUBLIC_CMS_URL and NEXT_PUBLIC_CMS_API_KEY an NEXT_PUBLIC_CMS_CATEGORY");
}

const category = process.env.NEXT_PUBLIC_CMS_CATEGORY;

export const Client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_CMS_URL,
  apiKey: process.env.NEXT_PUBLIC_CMS_API_KEY,
});

export const GetList = async (queries?: MicroCMSQueries) => {
  const listData = await Client.getList<Blog>({
    endpoint: category,
    queries,
  });

  return listData;
};

export const GetDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await Client.getListDetail<Blog>({
    endpoint: category,
    contentId,
    queries,
  });

  return detailData;
};
