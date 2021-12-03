const EVENTS = {
    connection: "connection",
    CLIENT: {
      SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
      JOIN_ROOM: "JOIN_ROOM",
      LEAVE_ROOM:'LEAVE_ROOM'
    },
    SERVER: {
      JOINED_ROOM: "JOINED_ROOM",
      ROOM_MESSAGE: "ROOM_MESSAGE",
      GUEST:'GUEST'
      
    },
  };
  
  export default EVENTS;