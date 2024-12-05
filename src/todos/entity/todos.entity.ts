import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('todos')
export class Todos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({default: false})
    status: boolean;


}