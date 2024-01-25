import {CanDeactivateFn} from '@angular/router';
import {CanComponentDeactivate} from "../interfaces/can-component-deactivate.interface";

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute,
                                                                            currentState, nextState) => {
  console.log('CanDeactivate Guard is called');
  //component is responsible for deactivating
  return component.canDeactivate?.() ?? true;
};
