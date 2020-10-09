import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoResolver } from 'src/video.resolver';

@Module({
  providers: [VideoService, VideoResolver],
})
export class VideoModule {}
