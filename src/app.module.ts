import Joi = require("joi")
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';
// import { StripePaymentModule } from './stripe-payment/stripe-payment.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: Joi.object({
      MONTHLY_SUBSCRIPTION_PRICE_ID: Joi.string(),
    })
  }),
  StripeModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
