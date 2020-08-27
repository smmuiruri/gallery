var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://sam:sam@cluster0-shard-00-02.f4e6e.mongodb.net/darkroom?retryWrites=true&w=majority',
    development: 'mongodb+srv://sam:sam@cluster0-shard-00-02.f4e6e.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://sam:sam@cluster0-shard-00-02.f4e6e.mongodb.net/darkroom-test?retryWrites=true&w=majority',
}
module.exports = config;
