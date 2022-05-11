/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import {CreateBillingDto} from './stripe.dto'
@Controller('subscriptions')
export class StripeSubscriptionController {
  constructor(private stripeService: StripeService) {}

  @Post('createSession')
  async create() {
    return this.stripeService.createSession();
  }
  @Post('createSubcriptions')
  async createSubscription(){
    return this.stripeService.createSubscription();
  }

  @Post('createSubscription1')
  async createSubscription1(@Body() data: CreateBillingDto, name: string){
    return this.stripeService.createSubscription1(data,name );
  }
}
