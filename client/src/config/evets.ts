const EVENTS = {
  connection: "connection",
  disconnecting:'disconnecting',
  CLIENT: {
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    CREATE_ROOM:'CREATE_ROOM',
    JOIN_ROOM: "JOIN_ROOM",
    LEAVE_ROOM:'LEAVE_ROOM'
  },
  SERVER: {
    JOINED_ROOM: "JOINED_ROOM",
    ROOMS:'ROOMS',
    GUEST:'GUEST',
    ROOM_MESSAGE: "ROOM_MESSAGE",
  },
};
  
  export default EVENTS;