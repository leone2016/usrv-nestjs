import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {CreatePlayerDto} from "./Dto/CreatePlayer.dto";
//import {v4 as uuidv4} from 'uuid';
import {PlayerInterface} from "./Interfaces/player.interface";
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

@Injectable()
export class PlayersService {

    private players: PlayerInterface[] = [];
    private readonly logger = new Logger(PlayersService.name)

    constructor(@InjectModel('Player') private readonly  playerModel: Model<PlayerInterface>) {
    }

    async createPlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
        const {email} = createPlayerDto;
        const dbPlayer = await this.playerModel.findOne({email}).exec();
        if (dbPlayer) {
            this.update(createPlayerDto);
        }
        this.create(createPlayerDto);
    }

    async getPlayer(): Promise<PlayerInterface[]> {
        //return this.players;
        return await this.playerModel.find().exec();
    }

    async deletePlayerByEmail(email:string): Promise<void>{
        return await this.playerModel.remove({email}).exec();
    }

    async getPlayerByEmail(email: string): Promise<PlayerInterface> {
        return await this.playerModel.findOne({email}).exec();
    }
    /*async getPlayerByEmail(email: string): Promise<PlayerInterface> {
        const player = this.players.find(player => player.email === email);
        if (!player) {
            throw new NotFoundException(`Player with email ${email} not found`)
        }
        return player;
    }*/

    /*async deletePlayerByEmail(email: string): Promise<PlayerInterface[]> {
        const players = this.players.filter(player => player.email != email);

        if (players && players.length > 0) {
            throw new NotFoundException(`Player with email ${email} not found`)
        }
        return players;
    }*/

    //Region Private method
    private async create(createPlayerDto: CreatePlayerDto): Promise<PlayerInterface> {

        const playerCreated = new this.playerModel(createPlayerDto);
        return playerCreated.save();

        /*  const {name, phoneNumber, email} = createPlayerDto;
          const player: PlayerInterface = {
              //_id: uuidv4,
              name, phoneNumber, email,
              ranking: 'A',
              rankingPosition: 1,
              urlPhoto: "www.google.com/test.jpg "
          }
          this.logger.log(`createPlayer ${JSON.stringify(player)}`);
          this.players.push(player);*/
    }

    private async update( dbPlayer: CreatePlayerDto): Promise<PlayerInterface> {
        return await this.playerModel.findByIdAndUpdate({email: dbPlayer.email}, {$set: dbPlayer}).exec();
    }

    // endRegion
}
