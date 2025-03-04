import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field((type) => Int , {nullable: true})
    mobileNo: number;
}

