import { Injectable } from '@nestjs/common';
import { Video, UserVideo } from 'src/graphql';
import { VideoDTO } from './video.dto';

@Injectable()
export class VideoService {
  private videos: Video[] = [];

  getAllVideos() {
    return this.videos;
  }

  getVideo(id: string) {
    return this.videos.find(video => video.id == id);
  }

  createVideo({ title, url, authorId }: VideoDTO): Video {
    const videoId = this.videos.length + 1;
    const newVideo: Video = new Video();
    newVideo.title = title;
    newVideo.url = url;
    newVideo.id = videoId.toString();
    const author = new UserVideo();
    author.id = authorId;
    author.name = 'Author ' + authorId;
    newVideo.author = author;
    this.videos.push(newVideo);

    console.log(newVideo);
    return newVideo;
  }
}
