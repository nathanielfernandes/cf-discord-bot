export const ApplicationCommandOptionType  = {
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP:2,
    STRING: 3,
    INTEGER: 4,
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7,
    ROLE:8,
    MENTIONABLE: 9
}

export const ApplicationCommandPermissionType = {
    ROLE: 1,
    USER: 2
}

export const InteractionRequestType = {
    PING: 1,                                  
    APPLICATION_COMMAND: 2,
    MESSAGE_COMPONENT: 3
}

export const InteractionCallbackType = {
    PONG: 1,                                    // ACK a Ping
    CHANNEL_MESSAGE_WITH_SOURCE: 4,             // respond to an interaction with a message
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,    // ACK an interaction and edit a response later, the user sees a loading state
    DEFERRED_UPDATE_MESSAGE: 6,                 // for components, ACK an interaction and edit the original message later; the user does not see a loading state
    UPDATE_MESSAGE: 7                           // 	for components, edit the message the component was attached to
}