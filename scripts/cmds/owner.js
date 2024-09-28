module.exports = {
    config: {
        name: "owner",
        role: 0,
        author: "Micazhla",
        aliases: ["own", "master"],
        longDescription: "See owner name and link"
    },
    onStart: async function ({ message, api, event }) {
        const msg = "Name: Daryl Abarracoso\nAge: 20\nMATH MAJOR FROM RTU-CED\nStatus: Single\nLink: https://www.facebook.com/daryl.abarracoso\nIG LINK: https://www.instagram.com/hhjryl?igsh=MWRodDE2b3I5OWtjdg==";

        message.reply(msg);
    }
};
