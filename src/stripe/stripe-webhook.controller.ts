import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('webhooks')
export class StripeWebhookController {
  constructor(private stripeService: StripeService) {}

  /**Create Webhook Endpoint */
  @Post('createWebhookEndpoint')
  async createWebhookEndpoint(){
    return this.stripeService.createWebhookEndpoint();
  }
  /** Handle a Stripe webhook */
  @Post('handleWebhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
  
    
  ) {
    return this.stripeService.handleWebhook(signature);
  }
  
}