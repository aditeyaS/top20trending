export interface MusicResponseModel {
  tracks: Tracks;
}

export interface Tracks {
  track: TracksData[];
}

export interface TracksData {
  name: string;
  duration: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: Streamable;
  artist: Artist;
  image: Image[];
}

export interface Streamable {
  "#text": string;
  fulltrack: string;
}

export interface Artist {
  name: string;
  mbid: string;
  url: string;
}

export interface Image {
  "#text": string;
  size: string;
}
