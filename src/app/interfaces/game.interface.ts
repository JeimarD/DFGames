export interface Game {
    id: number,
    title: string,
    thumbnail: string,
    short_description: string,
    game_url: string,
    genre: string,
    platform: string,
    publisher: string,
    developer: string,
    release_date: string,
    freetogame_profile_url: string
}

export interface GameDetails {
    id: number,
    title: string,
    thumbnail: string,
    status: string,
    short_description: string,
    description: string,
    game_url: string,
    genre: string,
    platform: string,
    publisher: string,
    developer: string,
    release_date: string,
    freetogame_profile_url: string,
    minimum_system_requirements: MinimumSystemRequirements,
    screenshots: GameDetailScreenshots[],
}

export interface MinimumSystemRequirements {
    os: string,
    processor: string,
    graphics: string,
    storage: string
}

export interface GameDetailScreenshots {
    id: number,
    image: string
}
