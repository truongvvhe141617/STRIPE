/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
  } from '@nestjs/common';
  import Stripe from 'stripe';
  import {
    CreateBillingDto,
    ReplaceBillingDto,
    UpdateBillingDto,
    CreateProductDto,
  } from './stripe.dto';
  import { StripeService } from './stripe.service';

  @Controller('billing')
    export class StripeBillingController {
  constructor(private stripeService: StripeService) {}

  @Post('createCustomer')
  async createBillingAccount(
    @Body() data: CreateBillingDto,
  ): Promise<Stripe.Customer> {
    return this.stripeService.createCustomer(data);
  }

 
  /** Read billing for a group */
  @Get()
  async getBillingAccount(
    @Param('id') id: string,
  ): Promise<Stripe.Customer> {
    return this.stripeService.getCustomer(id);
  }
   /** Update billing for a group */
   @Patch()
   async updateBillingAccount(
     @Param('id') id: string,
     @Body() data: UpdateBillingDto,
   ): Promise<Stripe.Customer> {
     return this.stripeService.updateCustomer(data);
   }
 
  //  /** Replace billing for a group */
  //  @Put()
  //  async replaceBillingAccount(
  //    @Param('groupId', ParseIntPipe) groupId: number,
  //    @Body() data: ReplaceBillingDto,
  //  ): Promise<Stripe.Customer> {
  //    return this.stripeService.updateCustomer(groupId, data);
  //  }
 
   /** Delete billing for a group */
   @Delete()
   async deleteBillingAccount(
     @Param('id') id: string,
   ): Promise<Stripe.DeletedCustomer> {
     return this.stripeService.deleteCustomer(id);
   }
   

}