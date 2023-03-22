import { Channel } from '../entitities/channel.entity';

export interface AddChannelResponse {
  added: Channel[];
  alreadyExist: Channel[];
}
