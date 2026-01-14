import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Public } from '../../../../shared/decorators/public.decorator';


// TODO: move all channels to separate const
@Public()
@WebSocketGateway({
    cors: {
        origin: '*'
    },
    namespace: 'battles'
})
export class GameBattlesGateways implements OnGatewayDisconnect{
    @WebSocketServer()
    private readonly server!: Server;

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) 
        private readonly logger: Logger
    ) {}

    async handleDisconnect(client: Socket) {
        const battleId = client.data.battleId;

        if(battleId) {
            this.logger.info(`Client ${client.id} disconnected from battle: ${battleId}`);

            await this.emitPresenceUpdate(battleId);
        }
    }

    @SubscribeMessage('join_battle')
    async handleJoinBattle(
        @ConnectedSocket() client: Socket,
        @MessageBody('battleId') battleId: string,
    ) {
        console.log(1234)
        client.data.battleId = battleId;

        client.join(battleId);

        this.logger.info(`Client ${client.id} joined room: ${battleId}`);

        await this.emitPresenceUpdate(battleId);
    }

    private async emitPresenceUpdate(battleId: string) {
        const sockets = await this.server.in(battleId).fetchSockets();
        const count = sockets.length;

        this.server.to(battleId).emit("presence_updated", {
            battleId,
            onlineCount: count
        })

        this.logger.info(`Presence in ${battleId}: ${count} users online`);
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