export const AnimeType = {
  tv: "TV",
  ova: "OVA",
  ona: "ONA",
  movie: "MOVIE",
  special: "SPECIAL",
  music: "MUSIC",
  cm: "CM",
  pv: "PV",
  tv_special: "TV_SPECIAL",
};

export const AnimeTypeToStr = (type: string): string => {
  switch (type) {
    case AnimeType.tv:
      return "TV";
    case AnimeType.ova:
      return "OVA";
    case AnimeType.ona:
      return "ONA";
    case AnimeType.movie:
      return "Movie";
    case AnimeType.special:
      return "Special";
    case AnimeType.music:
      return "Music";
    case AnimeType.cm:
      return "CM";
    case AnimeType.pv:
      return "PV";
    case AnimeType.tv_special:
      return "TV Special";
    default:
      return "-";
  }
};

export const AnimeStatus = {
  finished: "FINISHED",
  releasing: "RELEASING",
  notYet: "NOT_YET",
};

export const AnimeStatusToStr = (status: string): string => {
  switch (status) {
    case AnimeStatus.finished:
      return "Finished";
    case AnimeStatus.releasing:
      return "Airing";
    case AnimeStatus.notYet:
      return "Not yet aired";
    default:
      return "-";
  }
};

const UserAnimeStatus = {
  watching: "WATCHING",
  completed: "COMPLETED",
  onHold: "ON_HOLD",
  dropped: "DROPPED",
  planned: "PLANNED",
};

export const UserAnimeStatusStr = (status: string): string => {
  switch (status) {
    case UserAnimeStatus.watching:
      return "Watching";
    case UserAnimeStatus.completed:
      return "Completed";
    case UserAnimeStatus.onHold:
      return "On Hold";
    case UserAnimeStatus.dropped:
      return "Dropped";
    case UserAnimeStatus.planned:
      return "Planned";
    default:
      return "";
  }
};

export const AnimeRelation = {
  sequel: "SEQUEL",
  prequel: "PREQUEL",
  alternativeSetting: "ALTERNATIVE_SETTING",
  alternativeVersion: "ALTERNATIVE_VERSION",
  sideStory: "SIDE_STORY",
  parentStory: "PARENT_STORY",
  summary: "SUMMARY",
  fullStory: "FULL_STORY",
  spinOff: "SPIN_OFF",
  adaptation: "ADAPTATION",
  character: "CHARACTER",
  other: "OTHER",
};

export const AnimeRelationToStr = (relation: string): string => {
  switch (relation) {
    case AnimeRelation.sequel:
      return "Sequel";
    case AnimeRelation.prequel:
      return "Prequel";
    case AnimeRelation.alternativeSetting:
      return "Alternative Setting";
    case AnimeRelation.alternativeVersion:
      return "Alternative Version";
    case AnimeRelation.sideStory:
      return "Side Story";
    case AnimeRelation.parentStory:
      return "Parent Story";
    case AnimeRelation.summary:
      return "Summary";
    case AnimeRelation.fullStory:
      return "Full Story";
    case AnimeRelation.spinOff:
      return "Spin Off";
    case AnimeRelation.adaptation:
      return "Adaptation";
    case AnimeRelation.character:
      return "Character";
    case AnimeRelation.other:
      return "Other";
    default:
      return "Unknown";
  }
};

export const Season = {
  winter: "WINTER",
  spring: "SPRING",
  summer: "SUMMER",
  fall: "FALL",
};

export const SeasonToStr = (season: string): string => {
  switch (season) {
    case Season.winter:
      return "Winter";
    case Season.spring:
      return "Spring";
    case Season.summer:
      return "Summer";
    case Season.fall:
      return "Fall";
    default:
      return "";
  }
};

const Day = {
  monday: "MONDAY",
  tuesday: "TUESDAY",
  wednesday: "WEDNESDAY",
  thursday: "THURSDAY",
  friday: "FRIDAY",
  saturday: "SATURDAY",
  sunday: "SUNDAY",
  other: "OTHER",
};

export const DayToStr = (day: string): string => {
  switch (day) {
    case Day.monday:
      return "Monday";
    case Day.tuesday:
      return "Tuesday";
    case Day.wednesday:
      return "Wednesday";
    case Day.thursday:
      return "Thursday";
    case Day.friday:
      return "Friday";
    case Day.saturday:
      return "Saturday";
    case Day.sunday:
      return "Sunday";
    case Day.other:
      return "Other";
    default:
      return "";
  }
};

const AnimeSource = {
  original: "ORIGINAL",
  manga: "MANGA",
  koma4Manga: "4_KOMA_MANGA",
  webManga: "WEB_MANGA",
  digitalManga: "DIGITAL_MANGA",
  novel: "NOVEL",
  lightNovel: "LIGHT_NOVEL",
  visualNovel: "VISUAL_NOVEL",
  game: "GAME",
  cardGame: "CARD_GAME",
  book: "BOOK",
  pictureBook: "PICTURE_BOOK",
  radio: "RADIO",
  music: "MUSIC",
  other: "OTHER",
  webNovel: "WEB_NOVEL",
  mixedMedia: "MIXED_MEDIA",
};

export const AnimeSourceToStr = (source: string): string => {
  switch (source) {
    case AnimeSource.original:
      return "Original";
    case AnimeSource.manga:
      return "Manga";
    case AnimeSource.koma4Manga:
      return "4 Koma Manga";
    case AnimeSource.webManga:
      return "Web Manga";
    case AnimeSource.digitalManga:
      return "Digital Manga";
    case AnimeSource.novel:
      return "Novel";
    case AnimeSource.lightNovel:
      return "Light Novel";
    case AnimeSource.visualNovel:
      return "Visual Novel";
    case AnimeSource.game:
      return "Game";
    case AnimeSource.cardGame:
      return "Card Game";
    case AnimeSource.book:
      return "Book";
    case AnimeSource.pictureBook:
      return "Picture Book";
    case AnimeSource.radio:
      return "Radio";
    case AnimeSource.music:
      return "Music";
    case AnimeSource.other:
      return "Other";
    case AnimeSource.webNovel:
      return "Web Novel";
    case AnimeSource.mixedMedia:
      return "Mixed Media";
    default:
      return "";
  }
};

const AnimeRating = {
  G: "G",
  PG: "PG",
  PG_13: "PG_13",
  R: "R",
  RP: "R+",
  RX: "RX",
};

export const AnimeRatingToStr = (rating: string): [string, string] => {
  switch (rating) {
    case AnimeRating.G:
      return ["G", "All Ages"];
    case AnimeRating.PG:
      return ["PG", "Children"];
    case AnimeRating.PG_13:
      return ["PG-13", "Teens 13 or older"];
    case AnimeRating.R:
      return ["R", "17+ recommended (violence & profanity)"];
    case AnimeRating.RP:
      return ["R+", "Mild Nudity (may also contain violence & profanity)"];
    case AnimeRating.RX:
      return ["Rx", "Hentai (extreme sexual content/nudity)"];
    default:
      return ["", ""];
  }
};

export const months = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const HistoryGroup = {
  weekly: "WEEKLY",
  monthly: "MONTHLY",
  yearly: "YEARLY",
};

export const Sort = {
  idAsc: "ID",
  idDesc: "-ID",
  titleAsc: "TITLE",
  titleDesc: "-TITLE",
  startDateAsc: "START_DATE",
  startDateDesc: "-START_DATE",
  meanAsc: "MEAN",
  meanDesc: "-MEAN",
  rankAsc: "RANK",
  rankDesc: "-RANK",
  popularityAsc: "POPULARITY",
  popularityDesc: "-POPULARITY",
  memberAsc: "MEMBER",
  memberDesc: "-MEMBER",
  voterAsc: "VOTER",
  voterDesc: "-VOTER",
};

export const SortToStr = (sort: string): string => {
  switch (sort) {
    case Sort.idAsc:
      return "id asc";
    case Sort.idDesc:
      return "id desc";
    case Sort.titleAsc:
      return "title asc";
    case Sort.titleDesc:
      return "title desc";
    case Sort.startDateAsc:
      return "start date asc";
    case Sort.startDateDesc:
      return "start date desc";
    case Sort.meanAsc:
      return "score asc";
    case Sort.meanDesc:
      return "score desc";
    case Sort.rankAsc:
      return "rank asc";
    case Sort.rankDesc:
      return "rank desc";
    case Sort.popularityAsc:
      return "popularity asc";
    case Sort.popularityDesc:
      return "popularity desc";
    case Sort.memberAsc:
      return "member count asc";
    case Sort.memberDesc:
      return "member count desc";
    case Sort.voterAsc:
      return "voter count asc";
    case Sort.voterDesc:
      return "voter count desc";
    default:
      return "-";
  }
};

export const BackgroundColors = [
  "bg-slate-600",
  "bg-gray-600",
  "bg-zinc-600",
  "bg-neutral-600",
  "bg-stone-600",
  "bg-red-600",
  "bg-orange-600",
  "bg-amber-600",
  "bg-yellow-600",
  "bg-lime-600",
  "bg-green-600",
  "bg-emerald-600",
  "bg-teal-600",
  "bg-cyan-600",
  "bg-sky-600",
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-purple-600",
  "bg-fuchsia-600",
  "bg-pink-600",
  "bg-rose-600",
];

export const BackgroundImages = Array.from(Array(7).keys()).map(
  (i) => `/images/bg/${i}.jpg`,
);
