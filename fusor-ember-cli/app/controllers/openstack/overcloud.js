import Ember from 'ember';
import DeploymentControllerMixin from "../../mixins/deployment-controller-mixin";
import NeedsDeploymentMixin from "../../mixins/needs-deployment-mixin";

export default Ember.Controller.extend(DeploymentControllerMixin, NeedsDeploymentMixin, {

  isCloudForms: Ember.computed.alias("deploymentController.isCloudForms"),

  nextStepRouteNameOvercloud: Ember.computed('isCloudForms', function() {
    if (this.get('isCloudForms')) {
      return 'cloudforms';
    } else {
      return 'subscriptions';
    }
  }),

  isValidPrivateNetworkRange: Ember.computed('model.deployment.openstack_overcloud_private_net', function() {
      // TODO
      return true;
  }),

  isValidPrivateFloatRange: Ember.computed('model.deployment.openstack_overcloud_float_net', function() {
      // TODO
      return true;
  }),

  validOvercloudNetworks: Ember.computed('neutronPublicInterface',
                                         'model.deployment.openstack_overcloud_private_net',
                                         'model.deployment.openstack_overcloud_float_net',
                                         'isValidPrivateNetworkRange',
                                         'isValidPrivateFloatRange',
                                          function() {
    return (Ember.isPresent(this.get('neutronPublicInterface')) &&
            Ember.isPresent(this.get('model.deployment.openstack_overcloud_private_net')) &&
            Ember.isPresent(this.get('model.deployment.openstack_overcloud_float_net')) &&
            this.get('isValidPrivateNetworkRange') &&
            this.get('isValidPrivateFloatRange')
           );
  }),

  disableNextOvercloud: Ember.computed.not('validOvercloudNetworks')

});