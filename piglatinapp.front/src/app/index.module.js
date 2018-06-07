/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { RegisterController } from './register/register.controller';
import { LoginController } from './login/login.controller';
import { TranslateController} from './translate/translate.controller';
import { RegisterService } from './services/register.service';
import { TranslateService } from './services/translate.service';
import { TokenService } from './services/token.service';
import { InterceptorService } from './services/interceptor.service';
import { HomeController } from './home/home.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('front', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'toastr'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  // SERVICES
  .service('githubContributor', GithubContributorService)
  .service('RegisterService', RegisterService)
  .service('TranslateService', TranslateService)
  .service('TokenService', TokenService)
  .service('webDevTec', WebDevTecService)
  .service('InterceptorService',InterceptorService)
  
  // Controllers
  .controller('MainController', MainController)
  .controller('RegisterController', RegisterController)
  .controller('TranslateController', TranslateController)
  .controller('LoginController', LoginController)

  .controller('HomeController', HomeController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective);
