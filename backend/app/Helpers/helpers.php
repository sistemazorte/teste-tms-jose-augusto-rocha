<?php

function randomNumberString(int $length): string
    {
        $numbers = '';
        for ($i = 0; $i < $length; $i++) {
            $numbers .= mt_rand(0, 9);
        }
        return $numbers;
    }

function randomCnhCategory(): string
    {
        $categories = ['A', 'B', 'C', 'D', 'E'];
        return $categories[array_rand($categories)];
    }

function randomCpf(): string
    {
        return randomNumberString(3) . '.' .
               randomNumberString(3) . '.' .
               randomNumberString(3) . '-' .
               randomNumberString(2);
    }

function randomPhoneNumber(): string
    {
        return 
        "+55 (48) 9" . randomNumberString(3) . "-" . randomNumberString(4);
    }