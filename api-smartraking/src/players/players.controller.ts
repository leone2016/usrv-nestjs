import {Body, Controller, Delete, Get, Post, Query} from '@nestjs/common';
import {CreatePlayerDto} from "./Dto/CreatePlayer.dto";
import {PlayersService} from "./players.service";
import {PlayerInterface} from "./Interfaces/player.interface";

@Controller('/api/v1/players')
export class PlayersController {

    constructor(private readonly _playerService: PlayersService) {
    }

    @Post()
    async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
        await this._playerService.createPlayer(createPlayerDto);
    }

    @Get()
    async getPlayer(@Query('email') email: string):Promise<PlayerInterface | PlayerInterface[]> {
        return email ? await this._playerService.getPlayerByEmail(email) : await this._playerService.getPlayer();
    }

    @Delete()
    async deletePlayer(@Query('email') email: string):Promise<void> {
        return await this._playerService.deletePlayerByEmail(email);
    }

}
