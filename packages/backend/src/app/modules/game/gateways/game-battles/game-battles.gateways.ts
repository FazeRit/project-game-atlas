import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Public } from '../../../../shared/decorators/public.decorator';

@Public()
@WebSocketGateway({
    cors: {
        origin: '*'
    },
    namespace: 'battles'
})
export class GameBattlesGateways {
    @WebSocketServer()
    private readonly server!: Server;

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) 
        private readonly logger: Logger
    ) {}

    @SubscribeMessage('join_battle')
    handleJoinBattle(
        @ConnectedSocket() client: Socket,
        @MessageBody('battleId') battleId: string,
    ) {
        client.join(battleId);

        this.logger.info(`Client ${client.id} joined room: ${battleId}`, { context: 'GameBattlesGateways' });
    }

    async emitBattleUpdate(battleId: string, votesA: number, votesB: number) {
        this.server.to(battleId).emit("battle_updated", {
            battleId,
            votesA,
            votesB
        });

        this.logger.info(`Emitted battle update for ${battleId}`, { votesA, votesB });
    }
}