import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreatePlayerDto} from "./Dto/CreatePlayer.dto";
import {PlayersService} from "./players.service";

@Controller('/api/v1/players')
export class PlayersController {

    constructor(private readonly _playerService:PlayersService ) {
    }
    @Post()
    async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
        await this._playerService.createPlayer(createPlayerDto);
    }

    @Get()
    async getPlayer(@Body() createPlayerDto: CreatePlayerDto) {
       return  await this._playerService.getPlayer(createPlayerDto);
    }

}
