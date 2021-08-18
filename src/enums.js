export const ApplicationCommandOptionType = {
    SubCommand: 1,
    SubCommandGroup: 2,
    String: 3,
    Integer: 4,
    Boolean: 5,
    User: 6,
    Channel: 7,
    Role: 8,
    Mentionable: 9
}

export const ApplicationCommandPermissionType = {
    Role: 1,
    User: 2
}

export const InteractionRequestType = {
    Ping: 1,
    ApplicationCommand: 2,
    MessageComponent: 3
}

export const InteractionCallbackType = {
    Pong: 1,                                    // ACK a Ping
    ChannelMessageWithSource: 4,                // respond to an interaction with a message
    DeferredChannelMessageWithSource: 5,        // ACK an interaction and edit a response later, the user sees a loading state
    DeferredUpdateMessage: 6,                   // for components, ACK an interaction and edit the original message later; the user does not see a loading state
    UpdateMessage: 7                            // 	for components, edit the message the component was attached to
}

export const InteractionCallbackDataFlag = {
    Ephemeral: 1<<6
}


export const MessageComponent = {
    ActionRow: 1,
    Button: 2, 
    SelectMenu: 3
}

export const ButtonStyle = {
    Primary: 1,
    Secondary: 2,
    Success: 3,
    Danger: 4,
    Link: 5,

    Blurple: 1, 
    Grey:2,
    Green:3,
    Red: 4,
}

