const Dependency = {
    Configuration: Symbol('Configuration'),
    Database: Symbol('Database'),
    // TODO Remove
    Environment: Symbol('Environment'),
    Logger: Symbol('Logger'),
    Repositories: Symbol('Repositories'),
    Server: Symbol('Server'),
    UseCases: Symbol('UseCases'),
};

export default Dependency;
