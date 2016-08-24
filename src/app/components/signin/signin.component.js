import template from './signin.html';

class SigninController {
    constructor($firebaseAuth, $state) {
        this.$firebaseAuth = $firebaseAuth();
        this.$state = $state;
    }

    google() {
        // login with Google
        this.$firebaseAuth.$signInWithPopup('google')
            .then(() => {
                this.$state.go('root.home');
            }).catch(() => {
                // console.log('Authentication failed:', error);
            });
    }
}
SigninController.$inject = ['$firebaseAuth', '$state'];

export const SigninComponent = {
    name: 'boomjsSignin',
    controller: SigninController,
    template,
};
