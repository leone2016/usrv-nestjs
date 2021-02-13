import {Injectable, Logger} from '@nestjs/common';
import {CreatePlayerDto} from "./Dto/CreatePlayer.dto";
import {v4 as uuidv4} from 'uuid';
import {PlayerInterface} from "./Interfaces/player.interface";

@Injectable()
export class PlayersService {

    private players: PlayerInterface[] = [];
    private readonly logger = new Logger(PlayersService.name)

    async createPlayer(createPlayerdto: CreatePlayerDto): Promise<void> {
        this.create(createPlayerdto);
    }

    async getPlayer(createPlayerdto: CreatePlayerDto): Promise<PlayerInterface[]> {
        return await this.players;
    }

    //Region Private method
    private create(createPlayerDto: CreatePlayerDto): void {
        const {name, phoneNumber, email} = createPlayerDto;
        const player: PlayerInterface = {
            _id: uuidv4,
            name, phoneNumber, email,
            ranking: 'A',
            rankingPosition:1,
            urlPhoto:"www.google.com/test.jpg "
        }
        this.logger.log(`createPlayer ${JSON.stringify(player)}`);
        this.players.push(player);
    }

    // endRegion
}
