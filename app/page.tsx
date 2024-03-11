import { serverSideMapleFetch } from "@/utils/serverSideMapleFetch";
import { makeHostUrl, makeUrlQuery } from "@/utils/utils";
import { headers } from "next/headers";

// 캐릭터 고유 ID 조회
async function getMapleStoryMOcid(queryInstance: any) {
  const res = await serverSideMapleFetch(
    process.env.NEXT_PUBLIC_MAPLE_HOST +
      `/maplestorym/v1/id?${makeUrlQuery(queryInstance)}`,
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      throw new Error("데이터 불러오기 중 오류가 발생했습니다.");
    });

  return res;
}

// 캐릭터 기본정보 조회
async function getMapleStoryMCharacterBasicInfo(queryInstance: any) {
  const res = await serverSideMapleFetch(
    process.env.NEXT_PUBLIC_MAPLE_HOST +
      `/maplestorym/v1/character/basic?${makeUrlQuery(queryInstance)}`,
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      throw new Error("데이터 불러오기 중 오류가 발생했습니다.");
    });

  return res;
}

// 장착 아이템 정보 조회
async function getMapleStoryMCharacterItemEquipmentInfo(queryInstance: any) {
  const res = await serverSideMapleFetch(
    process.env.NEXT_PUBLIC_MAPLE_HOST +
      `/maplestorym/v1/character/item-equipment?${makeUrlQuery(queryInstance)}`,
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      throw new Error("데이터 불러오기 중 오류가 발생했습니다.");
    });

  return res;
}

// 스탯 정보 조회
async function getMapleStoryMCharacterStatInfo(queryInstance: any) {
  const res = await serverSideMapleFetch(
    process.env.NEXT_PUBLIC_MAPLE_HOST +
      `/maplestorym/v1/character/stat?${makeUrlQuery(queryInstance)}`,
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      throw new Error("데이터 불러오기 중 오류가 발생했습니다.");
    });

  return res;
}

// 길드 정보 조회
async function getMapleStoryMCharacterGuildInfo(queryInstance: any) {
  const res = await serverSideMapleFetch(
    process.env.NEXT_PUBLIC_MAPLE_HOST +
      `/maplestorym/v1/character/guild?${makeUrlQuery(queryInstance)}`,
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      throw new Error("데이터 불러오기 중 오류가 발생했습니다.");
    });

  return res;
}

export default async function Home() {
  // 1. get ocid query instance
  const getOcidQueryInstance = {
    character_name: "아크",
    world_name: "아케인",
  };

  const { ocid } = await getMapleStoryMOcid(getOcidQueryInstance);
  if (!ocid) return <div>유저 고유 아이디 정보를 불러오지 못했습니다.</div>;

  // get characterBasic info query instance
  const getCharacterInfoInstance = {
    ocid: ocid,
  };

  const {
    character_name,
    world_name,
    character_date_create,
    character_date_last_login,
    character_date_last_logout,
    character_job_name,
    character_gender,
    character_exp,
    character_level,
  } = await getMapleStoryMCharacterBasicInfo(getCharacterInfoInstance);
  if (!character_name) return <div>유저 정보를 불러오지 못했습니다.</div>;

  const step3Data = await getMapleStoryMCharacterItemEquipmentInfo(
    getCharacterInfoInstance
  );
  const step4Data = await getMapleStoryMCharacterStatInfo(
    getCharacterInfoInstance
  );
  const step5Data = await getMapleStoryMCharacterGuildInfo(
    getCharacterInfoInstance
  );

  console.log("step3Data is ", step3Data);
  console.log("step4Data is ", step4Data);
  console.log("step5Data is ", step5Data);
  return (
    <div>
      <p>캐릭터명: {character_name}</p>
    </div>
  );
}
