import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VideoService } from './video/video.service';
import { VideoDTO } from './video/video.dto';

@Resolver()
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Query()
  videos() {
    return this.videoService.getAllVideos();
  }

  @Query()
  video(@Args('id') id: string) {
    return this.videoService.getVideo(id);
  }

  @Mutation('createVideo')
  create(@Args('input') payload: VideoDTO) {
    return this.videoService.createVideo(payload);
  }
}
