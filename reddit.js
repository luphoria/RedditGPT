const { exec } = require("child_process");
const util = require("util");
const reddioExec = util.promisify(exec);
class Reddit {
    flags = [];
    post_feed = [];
    pos = 0;
    subreddits = [];
    currentId = false;
    constructor(flags) {
        for (let flag in flags) {
            this.flags.push(flags[flag]);
        }
        reddioExec('reddio', (err, stdout, stderr) => {
            if (err) {
                console.error("An error occurred with reddio.");
                console.error(err, stdout, stderr);
                process.exit(1);
            }
        });
    };
    async feed(subreddits) {
        this.subreddits = subreddits;
        this.post_feed = [];
        let res = [];
        for (let i = 0; i < subreddits.length; i++) {
            try {
                let { stdout, stderr } = await reddioExec(`reddio print -l 20 ${subreddits[i]}`);
                if (stderr) console.error("WARNING: reddio encountered an error: ", stderr);
                stdout.split(/\n\s*\n/).forEach(post => { // filter empty
                    res.push(post);
                });
            } catch (err) {
                console.error("WARNING: reddio encountered an error: ", err);
            }
        }
        res = res.filter(post => post != ""); // filter empty again
        res = res.sort(() => Math.random() - 0.5); // randomize order for feed
        this.post_feed = res;
        return res;
    }
    async mv(dir) {
        switch (dir) {
            case "next":
                if (this.pos + 1 < this.post_feed.length) this.pos += 1;
                else {
                    this.pos = 0;
                    await this.feed(this.subreddits);
                    return this.mv(dir);
                }
                return this.post_feed[this.pos];
            case "prev":
                if (this.pos - 1 >= 0) this.pos -= 1;
                return this.post_feed[this.pos];
            case "rand":
                this.pos = Math.floor(Math.random() * this.post_feed.length);
                return this.post_feed[this.pos];
            default:
                throw new Error("unknown mv param " + dir);
        }
    }
    post(pos) {
        if(!pos) pos = this.pos;
        return this.post_feed[pos];
    }
    idFromPos(pos) {
        if(!pos) pos = this.pos;
        let postTitle = this.post_feed[pos].split(" ");
        return postTitle[postTitle.length - 1];
    }
    async open(id) {
        if(!this.currentId) this.currentId = this.idFromPos(this.pos);
        if(!id) id = this.currentId;
        let { stdout, stderr } = await reddioExec(`reddio p -l 1 comments/${id}`);
        if (stderr) console.error("WARNING: reddio encountered an error: ", stderr);
        this.currentId = id;
        return stdout.substring(0,stdout.indexOf("__________________________________________________")) // post only, strip comments. I use this method so that the title is still pretty.
    }
    async viewComments(id) {
        if(!id) id = this.currentId;
        let { stdout, stderr } = await reddioExec(`reddio p -l 35 comments/${id}`);
        if (stderr) console.error("WARNING: reddio encountered an error: ", stderr);
        return stdout;
    }
    async submit(subreddit,title,content) {
        await reddioExec(`reddio submit -t "${content}" ${subreddit} "${title}"`);
    }
    async postReply(msg,id) {
        if(!id) id = this.currentId;
        if(id.startsWith("t3_")) { // post reply
            await reddioExec(`reddio comment -t "${msg}" ${id}`);
        }
        else if(id.startsWith("t1_")) {
            // replying to comment
            await reddioExec(`echo "${msg}" | reddio comment ${id}`);
        }
        return await this.viewComments(id);
    }
}
module.exports = { Reddit };