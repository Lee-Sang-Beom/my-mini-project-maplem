// 캐릭터 고유 ID 조회
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

// 캐릭터 기본정보 조회
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

// 장착 아이템 정보 조회
async function getMapleStoryMCharacterItemEquipmentInfo(ocid: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_MAPLE_HOST +
      `/maplestorym/v1/character/item-equipment?ocid=${ocid}`,
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

// 스탯 정보 조회
async function getMapleStoryMCharacterStatInfo(ocid: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_MAPLE_HOST +
      `/maplestorym/v1/character/stat?ocid=${ocid}`,
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

// 길드 정보 조회
async function getMapleStoryMCharacterGuildInfo(ocid: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_MAPLE_HOST +
      `/maplestorym/v1/character/guild?ocid=${ocid}`,
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
  const { ocid } = await getMapleStoryMOcid("아크", "아케인");
  if (!ocid) return <div>유저 고유 아이디 정보를 불러오지 못했습니다.</div>;

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
  } = await getMapleStoryMCharacterBasicInfo(ocid);
  if (!character_name) return <div>유저 정보를 불러오지 못했습니다.</div>;

  const step3Data = await getMapleStoryMCharacterItemEquipmentInfo(ocid);
  const step4Data = await getMapleStoryMCharacterStatInfo(ocid);
  const step5Data = await getMapleStoryMCharacterGuildInfo(ocid);

  console.log("step3Data is ", step3Data);
  console.log("step4Data is ", step4Data);
  console.log("step5Data is ", step5Data);
  return (
    <div>
      <p>캐릭터명: {character_name}</p>
      <p>월드명: {world_name}</p>
      <p>캐릭터 생성일: {character_date_create}</p>
      <p>캐릭터 로그인 시간:{character_date_last_login}</p>
      <p>캐릭터 로그아웃 시간: {character_date_last_logout}</p>
      <p>직업명: {character_job_name}</p>
      <p>캐릭터 성별: {character_gender}</p>
      <p>현재 보유 경험치: {character_exp.toLocaleString()}</p>
      <p>현재 레벨: {character_level}</p>

      <p>전투력: {step4Data.stat[0].stat_value}</p>
      <p>물리 공격력: {step4Data.stat[1].stat_value}</p>
      <p>마법 공격력: {step4Data.stat[2].stat_value}</p>
      <p>물리 방어력: {step4Data.stat[3].stat_value}</p>
      <p>마법 방어력: {step4Data.stat[4].stat_value}</p>
      <p>HP: {step4Data.stat[5].stat_value}</p>
      <p>MP: {step4Data.stat[6].stat_value}</p>
      <p>소속 길드: {step5Data.guild_name}</p>
    </div>
  );
}
