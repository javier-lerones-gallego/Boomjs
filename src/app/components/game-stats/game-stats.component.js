import template from './game-stats.html';

class GameStatsController {
    constructor(GameService, $state) {
        this.GameService = GameService;
        this.$state = $state;
    }

    get allActive() { return this.games.filter(g => g.isReady || g.isStarted); }
    get allDone() { return this.games.filter(g => g.isFinished || g.isOver); }
    get allFinished() { return this.games.filter(g => g.isFinished); }
    get allOver() { return this.games.filter(g => g.isOver); }

    get easy() { return this.games.filter(g => g.isEasy); }
    get medium() { return this.games.filter(g => g.isMedium); }
    get expert() { return this.games.filter(g => g.isExpert); }

    get easyFinished() {
        return this.allFinished.filter(g => g.isEasy).sort(this.sortByTimeElappsed);
    }
    get easyActive() { return this.allActive.filter(g => g.isEasy).sort(this.sortByTimeElappsed); }
    get easyOver() { return this.allOver.filter(g => g.isEasy).sort(this.sortByTimeElappsed); }
    get easyFastest() { return this.easyFinished[0]; }
    get easySlowest() { return this.easyFinished[this.easyFinished.length - 1]; }

    get mediumFinished() {
        return this.allFinished.filter(g => g.isMedium).sort(this.sortByTimeElappsed);
    }
    get mediumActive() {
        return this.allActive.filter(g => g.isMedium).sort(this.sortByTimeElappsed);
    }
    get mediumOver() { return this.allOver.filter(g => g.isMedium).sort(this.sortByTimeElappsed); }
    get mediumFastest() { return this.easyFinished[0]; }
    get mediumSlowest() { return this.easyFinished[this.easyFinished.length - 1]; }

    get expertFinished() {
        return this.allFinished.filter(g => g.isExpert).sort(this.sortByTimeElappsed);
    }
    get expertActive() {
        return this.allActive.filter(g => g.isExpert).sort(this.sortByTimeElappsed);
    }
    get expertOver() { return this.allOver.filter(g => g.isExpert).sort(this.sortByTimeElappsed); }
    get expertFastest() { return this.easyFinished[0]; }
    get expertSlowest() { return this.easyFinished[this.easyFinished.length - 1]; }

    sortByTimeElappsed(a, b) {
        if (a.stats.time_elapsed < b.stats.time_elapsed) {
            return -1;
        }
        if (a.stats.time_elapsed > b.stats.time_elapsed) {
            return 1;
        }
        return 0;
    }
}
GameStatsController.$inject = ['GameService', '$state'];

export const GameStatsComponent = {
    name: 'gameStats',
    bindings: {
        games: '<',
    },
    controller: GameStatsController,
    template,
};
