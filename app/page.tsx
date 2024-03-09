async function getMapleStoryMOcid(character_name: string, world_name: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_MAPLE_HOST +
      `/maplestorym/v1/id?character_name=${character_name}&world_name=${world_name}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_MAPLE_SECRET,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return res;
}

async function getMapleStoryMCharacterBasicInfo(ocid: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_MAPLE_HOST +
      `/maplestorym/v1/character/basic?ocid=${ocid}`,
    {
      headers: {
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_MAPLE_SECRET,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return res;
}

export default async function Home() {
  const { ocid } = await getMapleStoryMOcid("궤폭", "아케인");
  if (!ocid) return <div>유저 고유 아이디 정보를 불러오지 못했습니다.</div>;

  const characterBasicInfoData = await getMapleStoryMCharacterBasicInfo(ocid);
  if (!characterBasicInfoData)
    return <div>유저 정보를 불러오지 못했습니다.</div>;

  console.log(characterBasicInfoData);
  return <div>{characterBasicInfoData.character_job_name}</div>;
}
