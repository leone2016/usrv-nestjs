import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PlayersModule} from './players/players.module';

@Module({
    imports: [
        PlayersModule,
        MongooseModule.forRoot('mongodb+srv://admin:niWXmU0zyXUKahCD@cluster0.2kquz.mongodb.net/usrv_nestjs?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })],
    controllers: [],
    providers: [],
})
export class AppModule {
}
