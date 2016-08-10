

export default function Run($state) {
    // Initially redirect to the home to avoid errors on game states
    $state.go('root.home');
}
Run.$inject = ['$state'];
