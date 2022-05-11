import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';
import { StripeBillingController } from './stripe-billing.controller';
import { StripeWebhookController } from './stripe-webhook.controller';
import { StripeSubscriptionController } from './stripe-subscription.controller';
import {ProductController} from './strip-product.controller';
// import { StripeSourcesController } from './stripe-sources.controller';
// import { StripeInvoicesController } from './stripe-invoices.controller';
@Module({
    imports: [ConfigModule],
    providers: [StripeService],
    exports: [StripeService],
    controllers: [
      StripeBillingController,
    //   StripeInvoicesController,
    //   StripeSourcesController,
      StripeSubscriptionController,
      StripeWebhookController,
      ProductController,
    ],
  })
  export class StripeModule {}