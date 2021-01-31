import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

import * as Global from '../global/global';
import { Question } from '../question/question';
import { ActionRule } from '../question/action-rule';
import { ValidationRule } from '../question/validation-rule';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {
    //
  }

  public publicHolidays = {
    '1950-01-01': `Jour de l'an`,
    '1950-04-10': `Lundi de Pâques`,
    '1950-05-01': `Fête du travail`,
    '1950-05-08': `Victoire des alliés`,
    '1950-05-18': `Ascension`,
    '1950-05-29': `Lundi de Pentecôte`,
    '1950-07-14': `Fête Nationale`,
    '1950-08-15': `Assomption`,
    '1950-11-01': `Toussaint`,
    '1950-11-11': `Armistice`,
    '1950-12-25': `Noël`,
    '1951-01-01': `Jour de l'an`,
    '1951-03-26': `Lundi de Pâques`,
    '1951-05-01': `Fête du travail`,
    '1951-05-03': `Ascension`,
    '1951-05-08': `Victoire des alliés`,
    '1951-05-14': `Lundi de Pentecôte`,
    '1951-07-14': `Fête Nationale`,
    '1951-08-15': `Assomption`,
    '1951-11-01': `Toussaint`,
    '1951-11-11': `Armistice`,
    '1951-12-25': `Noël`,
    '1952-01-01': `Jour de l'an`,
    '1952-04-14': `Lundi de Pâques`,
    '1952-05-01': `Fête du travail`,
    '1952-05-08': `Victoire des alliés`,
    '1952-05-22': `Ascension`,
    '1952-06-02': `Lundi de Pentecôte`,
    '1952-07-14': `Fête Nationale`,
    '1952-08-15': `Assomption`,
    '1952-11-01': `Toussaint`,
    '1952-11-11': `Armistice`,
    '1952-12-25': `Noël`,
    '1953-01-01': `Jour de l'an`,
    '1953-04-06': `Lundi de Pâques`,
    '1953-05-01': `Fête du travail`,
    '1953-05-08': `Victoire des alliés`,
    '1953-05-14': `Ascension`,
    '1953-05-25': `Lundi de Pentecôte`,
    '1953-07-14': `Fête Nationale`,
    '1953-08-15': `Assomption`,
    '1953-11-01': `Toussaint`,
    '1953-11-11': `Armistice`,
    '1953-12-25': `Noël`,
    '1954-01-01': `Jour de l'an`,
    '1954-04-19': `Lundi de Pâques`,
    '1954-05-01': `Fête du travail`,
    '1954-05-08': `Victoire des alliés`,
    '1954-05-27': `Ascension`,
    '1954-06-07': `Lundi de Pentecôte`,
    '1954-07-14': `Fête Nationale`,
    '1954-08-15': `Assomption`,
    '1954-11-01': `Toussaint`,
    '1954-11-11': `Armistice`,
    '1954-12-25': `Noël`,
    '1955-01-01': `Jour de l'an`,
    '1955-04-11': `Lundi de Pâques`,
    '1955-05-01': `Fête du travail`,
    '1955-05-08': `Victoire des alliés`,
    '1955-05-19': `Ascension`,
    '1955-05-30': `Lundi de Pentecôte`,
    '1955-07-14': `Fête Nationale`,
    '1955-08-15': `Assomption`,
    '1955-11-01': `Toussaint`,
    '1955-11-11': `Armistice`,
    '1955-12-25': `Noël`,
    '1956-01-01': `Jour de l'an`,
    '1956-04-02': `Lundi de Pâques`,
    '1956-05-01': `Fête du travail`,
    '1956-05-08': `Victoire des alliés`,
    '1956-05-10': `Ascension`,
    '1956-05-21': `Lundi de Pentecôte`,
    '1956-07-14': `Fête Nationale`,
    '1956-08-15': `Assomption`,
    '1956-11-01': `Toussaint`,
    '1956-11-11': `Armistice`,
    '1956-12-25': `Noël`,
    '1957-01-01': `Jour de l'an`,
    '1957-04-22': `Lundi de Pâques`,
    '1957-05-01': `Fête du travail`,
    '1957-05-08': `Victoire des alliés`,
    '1957-05-30': `Ascension`,
    '1957-06-10': `Lundi de Pentecôte`,
    '1957-07-14': `Fête Nationale`,
    '1957-08-15': `Assomption`,
    '1957-11-01': `Toussaint`,
    '1957-11-11': `Armistice`,
    '1957-12-25': `Noël`,
    '1958-01-01': `Jour de l'an`,
    '1958-04-07': `Lundi de Pâques`,
    '1958-05-01': `Fête du travail`,
    '1958-05-08': `Victoire des alliés`,
    '1958-05-15': `Ascension`,
    '1958-05-26': `Lundi de Pentecôte`,
    '1958-07-14': `Fête Nationale`,
    '1958-08-15': `Assomption`,
    '1958-11-01': `Toussaint`,
    '1958-11-11': `Armistice`,
    '1958-12-25': `Noël`,
    '1959-01-01': `Jour de l'an`,
    '1959-03-30': `Lundi de Pâques`,
    '1959-05-01': `Fête du travail`,
    '1959-05-07': `Ascension`,
    '1959-05-08': `Victoire des alliés`,
    '1959-05-18': `Lundi de Pentecôte`,
    '1959-07-14': `Fête Nationale`,
    '1959-08-15': `Assomption`,
    '1959-11-01': `Toussaint`,
    '1959-11-11': `Armistice`,
    '1959-12-25': `Noël`,
    '1960-01-01': `Jour de l'an`,
    '1960-04-18': `Lundi de Pâques`,
    '1960-05-01': `Fête du travail`,
    '1960-05-08': `Victoire des alliés`,
    '1960-05-26': `Ascension`,
    '1960-06-06': `Lundi de Pentecôte`,
    '1960-07-14': `Fête Nationale`,
    '1960-08-15': `Assomption`,
    '1960-11-01': `Toussaint`,
    '1960-11-11': `Armistice`,
    '1960-12-25': `Noël`,
    '1961-01-01': `Jour de l'an`,
    '1961-04-03': `Lundi de Pâques`,
    '1961-05-01': `Fête du travail`,
    '1961-05-08': `Victoire des alliés`,
    '1961-05-11': `Ascension`,
    '1961-05-22': `Lundi de Pentecôte`,
    '1961-07-14': `Fête Nationale`,
    '1961-08-15': `Assomption`,
    '1961-11-01': `Toussaint`,
    '1961-11-11': `Armistice`,
    '1961-12-25': `Noël`,
    '1962-01-01': `Jour de l'an`,
    '1962-04-23': `Lundi de Pâques`,
    '1962-05-01': `Fête du travail`,
    '1962-05-08': `Victoire des alliés`,
    '1962-05-31': `Ascension`,
    '1962-06-11': `Lundi de Pentecôte`,
    '1962-07-14': `Fête Nationale`,
    '1962-08-15': `Assomption`,
    '1962-11-01': `Toussaint`,
    '1962-11-11': `Armistice`,
    '1962-12-25': `Noël`,
    '1963-01-01': `Jour de l'an`,
    '1963-04-15': `Lundi de Pâques`,
    '1963-05-01': `Fête du travail`,
    '1963-05-08': `Victoire des alliés`,
    '1963-05-23': `Ascension`,
    '1963-06-03': `Lundi de Pentecôte`,
    '1963-07-14': `Fête Nationale`,
    '1963-08-15': `Assomption`,
    '1963-11-01': `Toussaint`,
    '1963-11-11': `Armistice`,
    '1963-12-25': `Noël`,
    '1964-01-01': `Jour de l'an`,
    '1964-03-30': `Lundi de Pâques`,
    '1964-05-01': `Fête du travail`,
    '1964-05-07': `Ascension`,
    '1964-05-08': `Victoire des alliés`,
    '1964-05-18': `Lundi de Pentecôte`,
    '1964-07-14': `Fête Nationale`,
    '1964-08-15': `Assomption`,
    '1964-11-01': `Toussaint`,
    '1964-11-11': `Armistice`,
    '1964-12-25': `Noël`,
    '1965-01-01': `Jour de l'an`,
    '1965-04-19': `Lundi de Pâques`,
    '1965-05-01': `Fête du travail`,
    '1965-05-08': `Victoire des alliés`,
    '1965-05-27': `Ascension`,
    '1965-06-07': `Lundi de Pentecôte`,
    '1965-07-14': `Fête Nationale`,
    '1965-08-15': `Assomption`,
    '1965-11-01': `Toussaint`,
    '1965-11-11': `Armistice`,
    '1965-12-25': `Noël`,
    '1966-01-01': `Jour de l'an`,
    '1966-04-11': `Lundi de Pâques`,
    '1966-05-01': `Fête du travail`,
    '1966-05-08': `Victoire des alliés`,
    '1966-05-19': `Ascension`,
    '1966-05-30': `Lundi de Pentecôte`,
    '1966-07-14': `Fête Nationale`,
    '1966-08-15': `Assomption`,
    '1966-11-01': `Toussaint`,
    '1966-11-11': `Armistice`,
    '1966-12-25': `Noël`,
    '1967-01-01': `Jour de l'an`,
    '1967-03-27': `Lundi de Pâques`,
    '1967-05-01': `Fête du travail`,
    '1967-05-04': `Ascension`,
    '1967-05-08': `Victoire des alliés`,
    '1967-05-15': `Lundi de Pentecôte`,
    '1967-07-14': `Fête Nationale`,
    '1967-08-15': `Assomption`,
    '1967-11-01': `Toussaint`,
    '1967-11-11': `Armistice`,
    '1967-12-25': `Noël`,
    '1968-01-01': `Jour de l'an`,
    '1968-04-15': `Lundi de Pâques`,
    '1968-05-01': `Fête du travail`,
    '1968-05-08': `Victoire des alliés`,
    '1968-05-23': `Ascension`,
    '1968-06-03': `Lundi de Pentecôte`,
    '1968-07-14': `Fête Nationale`,
    '1968-08-15': `Assomption`,
    '1968-11-01': `Toussaint`,
    '1968-11-11': `Armistice`,
    '1968-12-25': `Noël`,
    '1969-01-01': `Jour de l'an`,
    '1969-04-07': `Lundi de Pâques`,
    '1969-05-01': `Fête du travail`,
    '1969-05-08': `Victoire des alliés`,
    '1969-05-15': `Ascension`,
    '1969-05-26': `Lundi de Pentecôte`,
    '1969-07-14': `Fête Nationale`,
    '1969-08-15': `Assomption`,
    '1969-11-01': `Toussaint`,
    '1969-11-11': `Armistice`,
    '1969-12-25': `Noël`,
    '1970-01-01': `Jour de l'an`,
    '1970-03-30': `Lundi de Pâques`,
    '1970-05-01': `Fête du travail`,
    '1970-05-07': `Ascension`,
    '1970-05-08': `Victoire des alliés`,
    '1970-05-18': `Lundi de Pentecôte`,
    '1970-07-14': `Fête Nationale`,
    '1970-08-15': `Assomption`,
    '1970-11-01': `Toussaint`,
    '1970-11-11': `Armistice`,
    '1970-12-25': `Noël`,
    '1971-01-01': `Jour de l'an`,
    '1971-04-12': `Lundi de Pâques`,
    '1971-05-01': `Fête du travail`,
    '1971-05-08': `Victoire des alliés`,
    '1971-05-20': `Ascension`,
    '1971-05-31': `Lundi de Pentecôte`,
    '1971-07-14': `Fête Nationale`,
    '1971-08-15': `Assomption`,
    '1971-11-01': `Toussaint`,
    '1971-11-11': `Armistice`,
    '1971-12-25': `Noël`,
    '1972-01-01': `Jour de l'an`,
    '1972-04-03': `Lundi de Pâques`,
    '1972-05-01': `Fête du travail`,
    '1972-05-08': `Victoire des alliés`,
    '1972-05-11': `Ascension`,
    '1972-05-22': `Lundi de Pentecôte`,
    '1972-07-14': `Fête Nationale`,
    '1972-08-15': `Assomption`,
    '1972-11-01': `Toussaint`,
    '1972-11-11': `Armistice`,
    '1972-12-25': `Noël`,
    '1973-01-01': `Jour de l'an`,
    '1973-04-23': `Lundi de Pâques`,
    '1973-05-01': `Fête du travail`,
    '1973-05-08': `Victoire des alliés`,
    '1973-05-31': `Ascension`,
    '1973-06-11': `Lundi de Pentecôte`,
    '1973-07-14': `Fête Nationale`,
    '1973-08-15': `Assomption`,
    '1973-11-01': `Toussaint`,
    '1973-11-11': `Armistice`,
    '1973-12-25': `Noël`,
    '1974-01-01': `Jour de l'an`,
    '1974-04-15': `Lundi de Pâques`,
    '1974-05-01': `Fête du travail`,
    '1974-05-08': `Victoire des alliés`,
    '1974-05-23': `Ascension`,
    '1974-06-03': `Lundi de Pentecôte`,
    '1974-07-14': `Fête Nationale`,
    '1974-08-15': `Assomption`,
    '1974-11-01': `Toussaint`,
    '1974-11-11': `Armistice`,
    '1974-12-25': `Noël`,
    '1975-01-01': `Jour de l'an`,
    '1975-03-31': `Lundi de Pâques`,
    '1975-05-01': `Fête du travail`,
    '1975-05-08': `Victoire des alliés`,
    '1975-05-19': `Lundi de Pentecôte`,
    '1975-07-14': `Fête Nationale`,
    '1975-08-15': `Assomption`,
    '1975-11-01': `Toussaint`,
    '1975-11-11': `Armistice`,
    '1975-12-25': `Noël`,
    '1976-01-01': `Jour de l'an`,
    '1976-04-19': `Lundi de Pâques`,
    '1976-05-01': `Fête du travail`,
    '1976-05-08': `Victoire des alliés`,
    '1976-05-27': `Ascension`,
    '1976-06-07': `Lundi de Pentecôte`,
    '1976-07-14': `Fête Nationale`,
    '1976-08-15': `Assomption`,
    '1976-11-01': `Toussaint`,
    '1976-11-11': `Armistice`,
    '1976-12-25': `Noël`,
    '1977-01-01': `Jour de l'an`,
    '1977-04-11': `Lundi de Pâques`,
    '1977-05-01': `Fête du travail`,
    '1977-05-08': `Victoire des alliés`,
    '1977-05-19': `Ascension`,
    '1977-05-30': `Lundi de Pentecôte`,
    '1977-07-14': `Fête Nationale`,
    '1977-08-15': `Assomption`,
    '1977-11-01': `Toussaint`,
    '1977-11-11': `Armistice`,
    '1977-12-25': `Noël`,
    '1978-01-01': `Jour de l'an`,
    '1978-03-27': `Lundi de Pâques`,
    '1978-05-01': `Fête du travail`,
    '1978-05-04': `Ascension`,
    '1978-05-08': `Victoire des alliés`,
    '1978-05-15': `Lundi de Pentecôte`,
    '1978-07-14': `Fête Nationale`,
    '1978-08-15': `Assomption`,
    '1978-11-01': `Toussaint`,
    '1978-11-11': `Armistice`,
    '1978-12-25': `Noël`,
    '1979-01-01': `Jour de l'an`,
    '1979-04-16': `Lundi de Pâques`,
    '1979-05-01': `Fête du travail`,
    '1979-05-08': `Victoire des alliés`,
    '1979-05-24': `Ascension`,
    '1979-06-04': `Lundi de Pentecôte`,
    '1979-07-14': `Fête Nationale`,
    '1979-08-15': `Assomption`,
    '1979-11-01': `Toussaint`,
    '1979-11-11': `Armistice`,
    '1979-12-25': `Noël`,
    '1980-01-01': `Jour de l'an`,
    '1980-04-07': `Lundi de Pâques`,
    '1980-05-01': `Fête du travail`,
    '1980-05-08': `Victoire des alliés`,
    '1980-05-15': `Ascension`,
    '1980-05-26': `Lundi de Pentecôte`,
    '1980-07-14': `Fête Nationale`,
    '1980-08-15': `Assomption`,
    '1980-11-01': `Toussaint`,
    '1980-11-11': `Armistice`,
    '1980-12-25': `Noël`,
    '1981-01-01': `Jour de l'an`,
    '1981-04-20': `Lundi de Pâques`,
    '1981-05-01': `Fête du travail`,
    '1981-05-08': `Victoire des alliés`,
    '1981-05-28': `Ascension`,
    '1981-06-08': `Lundi de Pentecôte`,
    '1981-07-14': `Fête Nationale`,
    '1981-08-15': `Assomption`,
    '1981-11-01': `Toussaint`,
    '1981-11-11': `Armistice`,
    '1981-12-25': `Noël`,
    '1982-01-01': `Jour de l'an`,
    '1982-04-12': `Lundi de Pâques`,
    '1982-05-01': `Fête du travail`,
    '1982-05-08': `Victoire des alliés`,
    '1982-05-20': `Ascension`,
    '1982-05-31': `Lundi de Pentecôte`,
    '1982-07-14': `Fête Nationale`,
    '1982-08-15': `Assomption`,
    '1982-11-01': `Toussaint`,
    '1982-11-11': `Armistice`,
    '1982-12-25': `Noël`,
    '1983-01-01': `Jour de l'an`,
    '1983-04-04': `Lundi de Pâques`,
    '1983-05-01': `Fête du travail`,
    '1983-05-08': `Victoire des alliés`,
    '1983-05-12': `Ascension`,
    '1983-05-23': `Lundi de Pentecôte`,
    '1983-07-14': `Fête Nationale`,
    '1983-08-15': `Assomption`,
    '1983-11-01': `Toussaint`,
    '1983-11-11': `Armistice`,
    '1983-12-25': `Noël`,
    '1984-01-01': `Jour de l'an`,
    '1984-04-23': `Lundi de Pâques`,
    '1984-05-01': `Fête du travail`,
    '1984-05-08': `Victoire des alliés`,
    '1984-05-31': `Ascension`,
    '1984-06-11': `Lundi de Pentecôte`,
    '1984-07-14': `Fête Nationale`,
    '1984-08-15': `Assomption`,
    '1984-11-01': `Toussaint`,
    '1984-11-11': `Armistice`,
    '1984-12-25': `Noël`,
    '1985-01-01': `Jour de l'an`,
    '1985-04-08': `Lundi de Pâques`,
    '1985-05-01': `Fête du travail`,
    '1985-05-08': `Victoire des alliés`,
    '1985-05-16': `Ascension`,
    '1985-05-27': `Lundi de Pentecôte`,
    '1985-07-14': `Fête Nationale`,
    '1985-08-15': `Assomption`,
    '1985-11-01': `Toussaint`,
    '1985-11-11': `Armistice`,
    '1985-12-25': `Noël`,
    '1986-01-01': `Jour de l'an`,
    '1986-03-31': `Lundi de Pâques`,
    '1986-05-01': `Fête du travail`,
    '1986-05-08': `Victoire des alliés`,
    '1986-05-19': `Lundi de Pentecôte`,
    '1986-07-14': `Fête Nationale`,
    '1986-08-15': `Assomption`,
    '1986-11-01': `Toussaint`,
    '1986-11-11': `Armistice`,
    '1986-12-25': `Noël`,
    '1987-01-01': `Jour de l'an`,
    '1987-04-20': `Lundi de Pâques`,
    '1987-05-01': `Fête du travail`,
    '1987-05-08': `Victoire des alliés`,
    '1987-05-28': `Ascension`,
    '1987-06-08': `Lundi de Pentecôte`,
    '1987-07-14': `Fête Nationale`,
    '1987-08-15': `Assomption`,
    '1987-11-01': `Toussaint`,
    '1987-11-11': `Armistice`,
    '1987-12-25': `Noël`,
    '1988-01-01': `Jour de l'an`,
    '1988-04-04': `Lundi de Pâques`,
    '1988-05-01': `Fête du travail`,
    '1988-05-08': `Victoire des alliés`,
    '1988-05-12': `Ascension`,
    '1988-05-23': `Lundi de Pentecôte`,
    '1988-07-14': `Fête Nationale`,
    '1988-08-15': `Assomption`,
    '1988-11-01': `Toussaint`,
    '1988-11-11': `Armistice`,
    '1988-12-25': `Noël`,
    '1989-01-01': `Jour de l'an`,
    '1989-03-27': `Lundi de Pâques`,
    '1989-05-01': `Fête du travail`,
    '1989-05-04': `Ascension`,
    '1989-05-08': `Victoire des alliés`,
    '1989-05-15': `Lundi de Pentecôte`,
    '1989-07-14': `Fête Nationale`,
    '1989-08-15': `Assomption`,
    '1989-11-01': `Toussaint`,
    '1989-11-11': `Armistice`,
    '1989-12-25': `Noël`,
    '1990-01-01': `Jour de l'an`,
    '1990-04-16': `Lundi de Pâques`,
    '1990-05-01': `Fête du travail`,
    '1990-05-08': `Victoire des alliés`,
    '1990-05-24': `Ascension`,
    '1990-06-04': `Lundi de Pentecôte`,
    '1990-07-14': `Fête Nationale`,
    '1990-08-15': `Assomption`,
    '1990-11-01': `Toussaint`,
    '1990-11-11': `Armistice`,
    '1990-12-25': `Noël`,
    '1991-01-01': `Jour de l'an`,
    '1991-04-01': `Lundi de Pâques`,
    '1991-05-01': `Fête du travail`,
    '1991-05-08': `Victoire des alliés`,
    '1991-05-09': `Ascension`,
    '1991-05-20': `Lundi de Pentecôte`,
    '1991-07-14': `Fête Nationale`,
    '1991-08-15': `Assomption`,
    '1991-11-01': `Toussaint`,
    '1991-11-11': `Armistice`,
    '1991-12-25': `Noël`,
    '1992-01-01': `Jour de l'an`,
    '1992-04-20': `Lundi de Pâques`,
    '1992-05-01': `Fête du travail`,
    '1992-05-08': `Victoire des alliés`,
    '1992-05-28': `Ascension`,
    '1992-06-08': `Lundi de Pentecôte`,
    '1992-07-14': `Fête Nationale`,
    '1992-08-15': `Assomption`,
    '1992-11-01': `Toussaint`,
    '1992-11-11': `Armistice`,
    '1992-12-25': `Noël`,
    '1993-01-01': `Jour de l'an`,
    '1993-04-12': `Lundi de Pâques`,
    '1993-05-01': `Fête du travail`,
    '1993-05-08': `Victoire des alliés`,
    '1993-05-20': `Ascension`,
    '1993-05-31': `Lundi de Pentecôte`,
    '1993-07-14': `Fête Nationale`,
    '1993-08-15': `Assomption`,
    '1993-11-01': `Toussaint`,
    '1993-11-11': `Armistice`,
    '1993-12-25': `Noël`,
    '1994-01-01': `Jour de l'an`,
    '1994-04-04': `Lundi de Pâques`,
    '1994-05-01': `Fête du travail`,
    '1994-05-08': `Victoire des alliés`,
    '1994-05-12': `Ascension`,
    '1994-05-23': `Lundi de Pentecôte`,
    '1994-07-14': `Fête Nationale`,
    '1994-08-15': `Assomption`,
    '1994-11-01': `Toussaint`,
    '1994-11-11': `Armistice`,
    '1994-12-25': `Noël`,
    '1995-01-01': `Jour de l'an`,
    '1995-04-17': `Lundi de Pâques`,
    '1995-05-01': `Fête du travail`,
    '1995-05-08': `Victoire des alliés`,
    '1995-05-25': `Ascension`,
    '1995-06-05': `Lundi de Pentecôte`,
    '1995-07-14': `Fête Nationale`,
    '1995-08-15': `Assomption`,
    '1995-11-01': `Toussaint`,
    '1995-11-11': `Armistice`,
    '1995-12-25': `Noël`,
    '1996-01-01': `Jour de l'an`,
    '1996-04-08': `Lundi de Pâques`,
    '1996-05-01': `Fête du travail`,
    '1996-05-08': `Victoire des alliés`,
    '1996-05-16': `Ascension`,
    '1996-05-27': `Lundi de Pentecôte`,
    '1996-07-14': `Fête Nationale`,
    '1996-08-15': `Assomption`,
    '1996-11-01': `Toussaint`,
    '1996-11-11': `Armistice`,
    '1996-12-25': `Noël`,
    '1997-01-01': `Jour de l'an`,
    '1997-03-31': `Lundi de Pâques`,
    '1997-05-01': `Fête du travail`,
    '1997-05-08': `Victoire des alliés`,
    '1997-05-19': `Lundi de Pentecôte`,
    '1997-07-14': `Fête Nationale`,
    '1997-08-15': `Assomption`,
    '1997-11-01': `Toussaint`,
    '1997-11-11': `Armistice`,
    '1997-12-25': `Noël`,
    '1998-01-01': `Jour de l'an`,
    '1998-04-13': `Lundi de Pâques`,
    '1998-05-01': `Fête du travail`,
    '1998-05-08': `Victoire des alliés`,
    '1998-05-21': `Ascension`,
    '1998-06-01': `Lundi de Pentecôte`,
    '1998-07-14': `Fête Nationale`,
    '1998-08-15': `Assomption`,
    '1998-11-01': `Toussaint`,
    '1998-11-11': `Armistice`,
    '1998-12-25': `Noël`,
    '1999-01-01': `Jour de l'an`,
    '1999-04-05': `Lundi de Pâques`,
    '1999-05-01': `Fête du travail`,
    '1999-05-08': `Victoire des alliés`,
    '1999-05-13': `Ascension`,
    '1999-05-24': `Lundi de Pentecôte`,
    '1999-07-14': `Fête Nationale`,
    '1999-08-15': `Assomption`,
    '1999-11-01': `Toussaint`,
    '1999-11-11': `Armistice`,
    '1999-12-25': `Noël`,
    '2000-01-01': `Jour de l'an`,
    '2000-04-24': `Lundi de Pâques`,
    '2000-05-01': `Fête du travail`,
    '2000-05-08': `Victoire des alliés`,
    '2000-06-01': `Ascension`,
    '2000-06-12': `Lundi de Pentecôte`,
    '2000-07-14': `Fête Nationale`,
    '2000-08-15': `Assomption`,
    '2000-11-01': `Toussaint`,
    '2000-11-11': `Armistice`,
    '2000-12-25': `Noël`,
    '2001-01-01': `Jour de l'an`,
    '2001-04-16': `Lundi de Pâques`,
    '2001-05-01': `Fête du travail`,
    '2001-05-08': `Victoire des alliés`,
    '2001-05-24': `Ascension`,
    '2001-06-04': `Lundi de Pentecôte`,
    '2001-07-14': `Fête Nationale`,
    '2001-08-15': `Assomption`,
    '2001-11-01': `Toussaint`,
    '2001-11-11': `Armistice`,
    '2001-12-25': `Noël`,
    '2002-01-01': `Jour de l'an`,
    '2002-04-01': `Lundi de Pâques`,
    '2002-05-01': `Fête du travail`,
    '2002-05-08': `Victoire des alliés`,
    '2002-05-09': `Ascension`,
    '2002-05-20': `Lundi de Pentecôte`,
    '2002-07-14': `Fête Nationale`,
    '2002-08-15': `Assomption`,
    '2002-11-01': `Toussaint`,
    '2002-11-11': `Armistice`,
    '2002-12-25': `Noël`,
    '2003-01-01': `Jour de l'an`,
    '2003-04-21': `Lundi de Pâques`,
    '2003-05-01': `Fête du travail`,
    '2003-05-08': `Victoire des alliés`,
    '2003-05-29': `Ascension`,
    '2003-06-09': `Lundi de Pentecôte`,
    '2003-07-14': `Fête Nationale`,
    '2003-08-15': `Assomption`,
    '2003-11-01': `Toussaint`,
    '2003-11-11': `Armistice`,
    '2003-12-25': `Noël`,
    '2004-01-01': `Jour de l'an`,
    '2004-04-12': `Lundi de Pâques`,
    '2004-05-01': `Fête du travail`,
    '2004-05-08': `Victoire des alliés`,
    '2004-05-20': `Ascension`,
    '2004-05-31': `Lundi de Pentecôte`,
    '2004-07-14': `Fête Nationale`,
    '2004-08-15': `Assomption`,
    '2004-11-01': `Toussaint`,
    '2004-11-11': `Armistice`,
    '2004-12-25': `Noël`,
    '2005-01-01': `Jour de l'an`,
    '2005-03-28': `Lundi de Pâques`,
    '2005-05-01': `Fête du travail`,
    '2005-05-05': `Ascension`,
    '2005-05-08': `Victoire des alliés`,
    '2005-05-16': `Lundi de Pentecôte`,
    '2005-07-14': `Fête Nationale`,
    '2005-08-15': `Assomption`,
    '2005-11-01': `Toussaint`,
    '2005-11-11': `Armistice`,
    '2005-12-25': `Noël`,
    '2006-01-01': `Jour de l'an`,
    '2006-04-17': `Lundi de Pâques`,
    '2006-05-01': `Fête du travail`,
    '2006-05-08': `Victoire des alliés`,
    '2006-05-25': `Ascension`,
    '2006-06-05': `Lundi de Pentecôte`,
    '2006-07-14': `Fête Nationale`,
    '2006-08-15': `Assomption`,
    '2006-11-01': `Toussaint`,
    '2006-11-11': `Armistice`,
    '2006-12-25': `Noël`,
    '2007-01-01': `Jour de l'an`,
    '2007-04-09': `Lundi de Pâques`,
    '2007-05-01': `Fête du travail`,
    '2007-05-08': `Victoire des alliés`,
    '2007-05-17': `Ascension`,
    '2007-05-28': `Lundi de Pentecôte`,
    '2007-07-14': `Fête Nationale`,
    '2007-08-15': `Assomption`,
    '2007-11-01': `Toussaint`,
    '2007-11-11': `Armistice`,
    '2007-12-25': `Noël`,
    '2008-01-01': `Jour de l'an`,
    '2008-03-24': `Lundi de Pâques`,
    '2008-05-01': `Fête du travail`,
    '2008-05-08': `Victoire des alliés`,
    '2008-05-12': `Lundi de Pentecôte`,
    '2008-07-14': `Fête Nationale`,
    '2008-08-15': `Assomption`,
    '2008-11-01': `Toussaint`,
    '2008-11-11': `Armistice`,
    '2008-12-25': `Noël`,
    '2009-01-01': `Jour de l'an`,
    '2009-04-13': `Lundi de Pâques`,
    '2009-05-01': `Fête du travail`,
    '2009-05-08': `Victoire des alliés`,
    '2009-05-21': `Ascension`,
    '2009-06-01': `Lundi de Pentecôte`,
    '2009-07-14': `Fête Nationale`,
    '2009-08-15': `Assomption`,
    '2009-11-01': `Toussaint`,
    '2009-11-11': `Armistice`,
    '2009-12-25': `Noël`,
    '2010-01-01': `Jour de l'an`,
    '2010-04-05': `Lundi de Pâques`,
    '2010-05-01': `Fête du travail`,
    '2010-05-08': `Victoire des alliés`,
    '2010-05-13': `Ascension`,
    '2010-05-24': `Lundi de Pentecôte`,
    '2010-07-14': `Fête Nationale`,
    '2010-08-15': `Assomption`,
    '2010-11-01': `Toussaint`,
    '2010-11-11': `Armistice`,
    '2010-12-25': `Noël`,
    '2011-01-01': `Jour de l'an`,
    '2011-04-25': `Lundi de Pâques`,
    '2011-05-01': `Fête du travail`,
    '2011-05-08': `Victoire des alliés`,
    '2011-06-02': `Ascension`,
    '2011-06-13': `Lundi de Pentecôte`,
    '2011-07-14': `Fête Nationale`,
    '2011-08-15': `Assomption`,
    '2011-11-01': `Toussaint`,
    '2011-11-11': `Armistice`,
    '2011-12-25': `Noël`,
    '2012-01-01': `Jour de l'an`,
    '2012-04-09': `Lundi de Pâques`,
    '2012-05-01': `Fête du travail`,
    '2012-05-08': `Victoire des alliés`,
    '2012-05-17': `Ascension`,
    '2012-05-28': `Lundi de Pentecôte`,
    '2012-07-14': `Fête Nationale`,
    '2012-08-15': `Assomption`,
    '2012-11-01': `Toussaint`,
    '2012-11-11': `Armistice`,
    '2012-12-25': `Noël`,
    '2013-01-01': `Jour de l'an`,
    '2013-04-01': `Lundi de Pâques`,
    '2013-05-01': `Fête du travail`,
    '2013-05-08': `Victoire des alliés`,
    '2013-05-09': `Ascension`,
    '2013-05-20': `Lundi de Pentecôte`,
    '2013-07-14': `Fête Nationale`,
    '2013-08-15': `Assomption`,
    '2013-11-01': `Toussaint`,
    '2013-11-11': `Armistice`,
    '2013-12-25': `Noël`,
    '2014-01-01': `Jour de l'an`,
    '2014-04-21': `Lundi de Pâques`,
    '2014-05-01': `Fête du travail`,
    '2014-05-08': `Victoire des alliés`,
    '2014-05-29': `Ascension`,
    '2014-06-09': `Lundi de Pentecôte`,
    '2014-07-14': `Fête Nationale`,
    '2014-08-15': `Assomption`,
    '2014-11-01': `Toussaint`,
    '2014-11-11': `Armistice`,
    '2014-12-25': `Noël`,
    '2015-01-01': `Jour de l'an`,
    '2015-04-06': `Lundi de Pâques`,
    '2015-05-01': `Fête du travail`,
    '2015-05-08': `Victoire des alliés`,
    '2015-05-14': `Ascension`,
    '2015-05-25': `Lundi de Pentecôte`,
    '2015-07-14': `Fête Nationale`,
    '2015-08-15': `Assomption`,
    '2015-11-01': `Toussaint`,
    '2015-11-11': `Armistice`,
    '2015-12-25': `Noël`,
    '2016-01-01': `Jour de l'an`,
    '2016-03-28': `Lundi de Pâques`,
    '2016-05-01': `Fête du travail`,
    '2016-05-05': `Ascension`,
    '2016-05-08': `Victoire des alliés`,
    '2016-05-16': `Lundi de Pentecôte`,
    '2016-07-14': `Fête Nationale`,
    '2016-08-15': `Assomption`,
    '2016-11-01': `Toussaint`,
    '2016-11-11': `Armistice`,
    '2016-12-25': `Noël`,
    '2017-01-01': `Jour de l'an`,
    '2017-04-17': `Lundi de Pâques`,
    '2017-05-01': `Fête du travail`,
    '2017-05-08': `Victoire des alliés`,
    '2017-05-25': `Ascension`,
    '2017-06-05': `Lundi de Pentecôte`,
    '2017-07-14': `Fête Nationale`,
    '2017-08-15': `Assomption`,
    '2017-11-01': `Toussaint`,
    '2017-11-11': `Armistice`,
    '2017-12-25': `Noël`,
    '2018-01-01': `Jour de l'an`,
    '2018-04-02': `Lundi de Pâques`,
    '2018-05-01': `Fête du travail`,
    '2018-05-08': `Victoire des alliés`,
    '2018-05-10': `Ascension`,
    '2018-05-21': `Lundi de Pentecôte`,
    '2018-07-14': `Fête Nationale`,
    '2018-08-15': `Assomption`,
    '2018-11-01': `Toussaint`,
    '2018-11-11': `Armistice`,
    '2018-12-25': `Noël`,
    '2019-01-01': `Jour de l'an`,
    '2019-04-22': `Lundi de Pâques`,
    '2019-05-01': `Fête du travail`,
    '2019-05-08': `Victoire des alliés`,
    '2019-05-30': `Ascension`,
    '2019-06-10': `Lundi de Pentecôte`,
    '2019-07-14': `Fête Nationale`,
    '2019-08-15': `Assomption`,
    '2019-11-01': `Toussaint`,
    '2019-11-11': `Armistice`,
    '2019-12-25': `Noël`,
    '2020-01-01': `Jour de l'an`,
    '2020-04-13': `Lundi de Pâques`,
    '2020-05-01': `Fête du travail`,
    '2020-05-08': `Victoire des alliés`,
    '2020-05-21': `Ascension`,
    '2020-06-01': `Lundi de Pentecôte`,
    '2020-07-14': `Fête Nationale`,
    '2020-08-15': `Assomption`,
    '2020-11-01': `Toussaint`,
    '2020-11-11': `Armistice`,
    '2020-12-25': `Noël`,
    '2021-01-01': `Jour de l'an`,
    '2021-04-05': `Lundi de Pâques`,
    '2021-05-01': `Fête du travail`,
    '2021-05-08': `Victoire des alliés`,
    '2021-05-13': `Ascension`,
    '2021-05-24': `Lundi de Pentecôte`,
    '2021-07-14': `Fête Nationale`,
    '2021-08-15': `Assomption`,
    '2021-11-01': `Toussaint`,
    '2021-11-11': `Armistice`,
    '2021-12-25': `Noël`,
    '2022-01-01': `Jour de l'an`,
    '2022-04-18': `Lundi de Pâques`,
    '2022-05-01': `Fête du travail`,
    '2022-05-08': `Victoire des alliés`,
    '2022-05-26': `Ascension`,
    '2022-06-06': `Lundi de Pentecôte`,
    '2022-07-14': `Fête Nationale`,
    '2022-08-15': `Assomption`,
    '2022-11-01': `Toussaint`,
    '2022-11-11': `Armistice`,
    '2022-12-25': `Noël`,
    '2023-01-01': `Jour de l'an`,
    '2023-04-10': `Lundi de Pâques`,
    '2023-05-01': `Fête du travail`,
    '2023-05-08': `Victoire des alliés`,
    '2023-05-18': `Ascension`,
    '2023-05-29': `Lundi de Pentecôte`,
    '2023-07-14': `Fête Nationale`,
    '2023-08-15': `Assomption`,
    '2023-11-01': `Toussaint`,
    '2023-11-11': `Armistice`,
    '2023-12-25': `Noël`,
    '2024-01-01': `Jour de l'an`,
    '2024-04-01': `Lundi de Pâques`,
    '2024-05-01': `Fête du travail`,
    '2024-05-08': `Victoire des alliés`,
    '2024-05-09': `Ascension`,
    '2024-05-20': `Lundi de Pentecôte`,
    '2024-07-14': `Fête Nationale`,
    '2024-08-15': `Assomption`,
    '2024-11-01': `Toussaint`,
    '2024-11-11': `Armistice`,
    '2024-12-25': `Noël`,
    '2025-01-01': `Jour de l'an`,
    '2025-04-21': `Lundi de Pâques`,
    '2025-05-01': `Fête du travail`,
    '2025-05-08': `Victoire des alliés`,
    '2025-05-29': `Ascension`,
    '2025-06-09': `Lundi de Pentecôte`,
    '2025-07-14': `Fête Nationale`,
    '2025-08-15': `Assomption`,
    '2025-11-01': `Toussaint`,
    '2025-11-11': `Armistice`,
    '2025-12-25': `Noël`,
    '2026-01-01': `Jour de l'an`,
    '2026-04-06': `Lundi de Pâques`,
    '2026-05-01': `Fête du travail`,
    '2026-05-08': `Victoire des alliés`,
    '2026-05-14': `Ascension`,
    '2026-05-25': `Lundi de Pentecôte`,
    '2026-07-14': `Fête Nationale`,
    '2026-08-15': `Assomption`,
    '2026-11-01': `Toussaint`,
    '2026-11-11': `Armistice`,
    '2026-12-25': `Noël`,
    '2027-01-01': `Jour de l'an`,
    '2027-03-29': `Lundi de Pâques`,
    '2027-05-01': `Fête du travail`,
    '2027-05-06': `Ascension`,
    '2027-05-08': `Victoire des alliés`,
    '2027-05-17': `Lundi de Pentecôte`,
    '2027-07-14': `Fête Nationale`,
    '2027-08-15': `Assomption`,
    '2027-11-01': `Toussaint`,
    '2027-11-11': `Armistice`,
    '2027-12-25': `Noël`,
    '2028-01-01': `Jour de l'an`,
    '2028-04-17': `Lundi de Pâques`,
    '2028-05-01': `Fête du travail`,
    '2028-05-08': `Victoire des alliés`,
    '2028-05-25': `Ascension`,
    '2028-06-05': `Lundi de Pentecôte`,
    '2028-07-14': `Fête Nationale`,
    '2028-08-15': `Assomption`,
    '2028-11-01': `Toussaint`,
    '2028-11-11': `Armistice`,
    '2028-12-25': `Noël`,
    '2029-01-01': `Jour de l'an`,
    '2029-04-02': `Lundi de Pâques`,
    '2029-05-01': `Fête du travail`,
    '2029-05-08': `Victoire des alliés`,
    '2029-05-10': `Ascension`,
    '2029-05-21': `Lundi de Pentecôte`,
    '2029-07-14': `Fête Nationale`,
    '2029-08-15': `Assomption`,
    '2029-11-01': `Toussaint`,
    '2029-11-11': `Armistice`,
    '2029-12-25': `Noël`,
    '2030-01-01': `Jour de l'an`,
    '2030-04-22': `Lundi de Pâques`,
    '2030-05-01': `Fête du travail`,
    '2030-05-08': `Victoire des alliés`,
    '2030-05-30': `Ascension`,
    '2030-06-10': `Lundi de Pentecôte`,
    '2030-07-14': `Fête Nationale`,
    '2030-08-15': `Assomption`,
    '2030-11-01': `Toussaint`,
    '2030-11-11': `Armistice`,
    '2030-12-25': `Noël`,
    '2031-01-01': `Jour de l'an`,
    '2031-04-14': `Lundi de Pâques`,
    '2031-05-01': `Fête du travail`,
    '2031-05-08': `Victoire des alliés`,
    '2031-05-22': `Ascension`,
    '2031-06-02': `Lundi de Pentecôte`,
    '2031-07-14': `Fête Nationale`,
    '2031-08-15': `Assomption`,
    '2031-11-01': `Toussaint`,
    '2031-11-11': `Armistice`,
    '2031-12-25': `Noël`,
    '2032-01-01': `Jour de l'an`,
    '2032-03-29': `Lundi de Pâques`,
    '2032-05-01': `Fête du travail`,
    '2032-05-06': `Ascension`,
    '2032-05-08': `Victoire des alliés`,
    '2032-05-17': `Lundi de Pentecôte`,
    '2032-07-14': `Fête Nationale`,
    '2032-08-15': `Assomption`,
    '2032-11-01': `Toussaint`,
    '2032-11-11': `Armistice`,
    '2032-12-25': `Noël`,
    '2033-01-01': `Jour de l'an`,
    '2033-04-18': `Lundi de Pâques`,
    '2033-05-01': `Fête du travail`,
    '2033-05-08': `Victoire des alliés`,
    '2033-05-26': `Ascension`,
    '2033-06-06': `Lundi de Pentecôte`,
    '2033-07-14': `Fête Nationale`,
    '2033-08-15': `Assomption`,
    '2033-11-01': `Toussaint`,
    '2033-11-11': `Armistice`,
    '2033-12-25': `Noël`,
    '2034-01-01': `Jour de l'an`,
    '2034-04-10': `Lundi de Pâques`,
    '2034-05-01': `Fête du travail`,
    '2034-05-08': `Victoire des alliés`,
    '2034-05-18': `Ascension`,
    '2034-05-29': `Lundi de Pentecôte`,
    '2034-07-14': `Fête Nationale`,
    '2034-08-15': `Assomption`,
    '2034-11-01': `Toussaint`,
    '2034-11-11': `Armistice`,
    '2034-12-25': `Noël`,
    '2035-01-01': `Jour de l'an`,
    '2035-03-26': `Lundi de Pâques`,
    '2035-05-01': `Fête du travail`,
    '2035-05-03': `Ascension`,
    '2035-05-08': `Victoire des alliés`,
    '2035-05-14': `Lundi de Pentecôte`,
    '2035-07-14': `Fête Nationale`,
    '2035-08-15': `Assomption`,
    '2035-11-01': `Toussaint`,
    '2035-11-11': `Armistice`,
    '2035-12-25': `Noël`,
    '2036-01-01': `Jour de l'an`,
    '2036-04-14': `Lundi de Pâques`,
    '2036-05-01': `Fête du travail`,
    '2036-05-08': `Victoire des alliés`,
    '2036-05-22': `Ascension`,
    '2036-06-02': `Lundi de Pentecôte`,
    '2036-07-14': `Fête Nationale`,
    '2036-08-15': `Assomption`,
    '2036-11-01': `Toussaint`,
    '2036-11-11': `Armistice`,
    '2036-12-25': `Noël`,
    '2037-01-01': `Jour de l'an`,
    '2037-04-06': `Lundi de Pâques`,
    '2037-05-01': `Fête du travail`,
    '2037-05-08': `Victoire des alliés`,
    '2037-05-14': `Ascension`,
    '2037-05-25': `Lundi de Pentecôte`,
    '2037-07-14': `Fête Nationale`,
    '2037-08-15': `Assomption`,
    '2037-11-01': `Toussaint`,
    '2037-11-11': `Armistice`,
    '2037-12-25': `Noël`,
    '2038-01-01': `Jour de l'an`,
    '2038-04-26': `Lundi de Pâques`,
    '2038-05-01': `Fête du travail`,
    '2038-05-08': `Victoire des alliés`,
    '2038-06-03': `Ascension`,
    '2038-06-14': `Lundi de Pentecôte`,
    '2038-07-14': `Fête Nationale`,
    '2038-08-15': `Assomption`,
    '2038-11-01': `Toussaint`,
    '2038-11-11': `Armistice`,
    '2038-12-25': `Noël`,
    '2039-01-01': `Jour de l'an`,
    '2039-04-11': `Lundi de Pâques`,
    '2039-05-01': `Fête du travail`,
    '2039-05-08': `Victoire des alliés`,
    '2039-05-19': `Ascension`,
    '2039-05-30': `Lundi de Pentecôte`,
    '2039-07-14': `Fête Nationale`,
    '2039-08-15': `Assomption`,
    '2039-11-01': `Toussaint`,
    '2039-11-11': `Armistice`,
    '2039-12-25': `Noël`,
    '2040-01-01': `Jour de l'an`,
    '2040-04-02': `Lundi de Pâques`,
    '2040-05-01': `Fête du travail`,
    '2040-05-08': `Victoire des alliés`,
    '2040-05-10': `Ascension`,
    '2040-05-21': `Lundi de Pentecôte`,
    '2040-07-14': `Fête Nationale`,
    '2040-08-15': `Assomption`,
    '2040-11-01': `Toussaint`,
    '2040-11-11': `Armistice`,
    '2040-12-25': `Noël`,
    '2041-01-01': `Jour de l'an`,
    '2041-04-22': `Lundi de Pâques`,
    '2041-05-01': `Fête du travail`,
    '2041-05-08': `Victoire des alliés`,
    '2041-05-30': `Ascension`,
    '2041-06-10': `Lundi de Pentecôte`,
    '2041-07-14': `Fête Nationale`,
    '2041-08-15': `Assomption`,
    '2041-11-01': `Toussaint`,
    '2041-11-11': `Armistice`,
    '2041-12-25': `Noël`,
    '2042-01-01': `Jour de l'an`,
    '2042-04-07': `Lundi de Pâques`,
    '2042-05-01': `Fête du travail`,
    '2042-05-08': `Victoire des alliés`,
    '2042-05-15': `Ascension`,
    '2042-05-26': `Lundi de Pentecôte`,
    '2042-07-14': `Fête Nationale`,
    '2042-08-15': `Assomption`,
    '2042-11-01': `Toussaint`,
    '2042-11-11': `Armistice`,
    '2042-12-25': `Noël`,
    '2043-01-01': `Jour de l'an`,
    '2043-03-30': `Lundi de Pâques`,
    '2043-05-01': `Fête du travail`,
    '2043-05-07': `Ascension`,
    '2043-05-08': `Victoire des alliés`,
    '2043-05-18': `Lundi de Pentecôte`,
    '2043-07-14': `Fête Nationale`,
    '2043-08-15': `Assomption`,
    '2043-11-01': `Toussaint`,
    '2043-11-11': `Armistice`,
    '2043-12-25': `Noël`,
    '2044-01-01': `Jour de l'an`,
    '2044-04-18': `Lundi de Pâques`,
    '2044-05-01': `Fête du travail`,
    '2044-05-08': `Victoire des alliés`,
    '2044-05-26': `Ascension`,
    '2044-06-06': `Lundi de Pentecôte`,
    '2044-07-14': `Fête Nationale`,
    '2044-08-15': `Assomption`,
    '2044-11-01': `Toussaint`,
    '2044-11-11': `Armistice`,
    '2044-12-25': `Noël`,
    '2045-01-01': `Jour de l'an`,
    '2045-04-10': `Lundi de Pâques`,
    '2045-05-01': `Fête du travail`,
    '2045-05-08': `Victoire des alliés`,
    '2045-05-18': `Ascension`,
    '2045-05-29': `Lundi de Pentecôte`,
    '2045-07-14': `Fête Nationale`,
    '2045-08-15': `Assomption`,
    '2045-11-01': `Toussaint`,
    '2045-11-11': `Armistice`,
    '2045-12-25': `Noël`,
    '2046-01-01': `Jour de l'an`,
    '2046-03-26': `Lundi de Pâques`,
    '2046-05-01': `Fête du travail`,
    '2046-05-03': `Ascension`,
    '2046-05-08': `Victoire des alliés`,
    '2046-05-14': `Lundi de Pentecôte`,
    '2046-07-14': `Fête Nationale`,
    '2046-08-15': `Assomption`,
    '2046-11-01': `Toussaint`,
    '2046-11-11': `Armistice`,
    '2046-12-25': `Noël`,
    '2047-01-01': `Jour de l'an`,
    '2047-04-15': `Lundi de Pâques`,
    '2047-05-01': `Fête du travail`,
    '2047-05-08': `Victoire des alliés`,
    '2047-05-23': `Ascension`,
    '2047-06-03': `Lundi de Pentecôte`,
    '2047-07-14': `Fête Nationale`,
    '2047-08-15': `Assomption`,
    '2047-11-01': `Toussaint`,
    '2047-11-11': `Armistice`,
    '2047-12-25': `Noël`,
    '2048-01-01': `Jour de l'an`,
    '2048-04-06': `Lundi de Pâques`,
    '2048-05-01': `Fête du travail`,
    '2048-05-08': `Victoire des alliés`,
    '2048-05-14': `Ascension`,
    '2048-05-25': `Lundi de Pentecôte`,
    '2048-07-14': `Fête Nationale`,
    '2048-08-15': `Assomption`,
    '2048-11-01': `Toussaint`,
    '2048-11-11': `Armistice`,
    '2048-12-25': `Noël`,
    '2049-01-01': `Jour de l'an`,
    '2049-04-19': `Lundi de Pâques`,
    '2049-05-01': `Fête du travail`,
    '2049-05-08': `Victoire des alliés`,
    '2049-05-27': `Ascension`,
    '2049-06-07': `Lundi de Pentecôte`,
    '2049-07-14': `Fête Nationale`,
    '2049-08-15': `Assomption`,
    '2049-11-01': `Toussaint`,
    '2049-11-11': `Armistice`,
    '2049-12-25': `Noël`,
    '2050-01-01': `Jour de l'an`,
    '2050-04-11': `Lundi de Pâques`,
    '2050-05-01': `Fête du travail`,
    '2050-05-08': `Victoire des alliés`,
    '2050-05-19': `Ascension`,
    '2050-05-30': `Lundi de Pentecôte`,
    '2050-07-14': `Fête Nationale`,
    '2050-08-15': `Assomption`,
    '2050-11-01': `Toussaint`,
    '2050-11-11': `Armistice`,
    '2050-12-25': `Noël`,
  };

  public getErrorPattern(type: string): string {
    switch (type) {
      case 'required':
        return `Ce champ est requis`;
      case 'contain':
        return `Ce champ doit contenir "{valeur}"`;
      case 'notContain':
        return `Ce champ ne doit pas contenir "{valeur}"`;
      case 'email':
        return `Vous devez entrer une adresse email valide`;
      case 'notEmpty':
        return `Ce champ ne doit pas être vide`;
      case 'url':
        return `Vous devez entrer une URL valide`;
      case 'minLength':
        return `Ce champ doit faire au moins {valeur} caractère{s}`;
      case 'maxLength':
        return `Ce champ doit faire au plus {valeur} caractère{s}`;
      case 'higher':
        return `Vous devez entrer une valeur supérieure à {valeur}`;
      case 'higherOrEqual':
        return `Vous devez entrer une valeur supérieure ou égale à {valeur}`;
      case 'lower':
        return `Vous devez entrer une valeur inférieure à {valeur}`;
      case 'lowerOrEqual':
        return `Vous devez entrer une valeur inférieure ou égale à {valeur}`;
      case 'equal':
        return `Ce champ doit être égal à "{valeur}"`;
      case 'different':
        return `Ce champ doit être différent de "{valeur}"`;
      case 'maxDecimal':
        return `Ce champ doit avoir au maximum {valeur} décimale{s}`;
      case 'nocheck':
        return `Aucune case ne doit être cochée`;
      case 'allChecked':
        return `Toutes les cases doivent être cochées`;
      case 'checkEqual':
        return `Il doit y avoir {valeur} case{s} cochée{s}`;
      case 'nocheckEqual':
        return `Il doit y avoir {valeur} case{s} non cochée{s}`;
      case 'checkMore':
        return `Il doit y avoir au moins {valeur} case{s} cochée{s}`;
      case 'checkLess':
        return `Il doit y avoir au plus {valeur} case{s} cochée{s}`;
      case 'noSpaces':
        return `Ce champ ne peut pas contenir d'espaces`;
      case 'hasLetter':
        return `Ce champ doit contenir au moins une lettre`;
      case 'hasNumber':
        return `Ce champ doit contenir au moins un chiffre`;
      case 'hasOnlyLetter':
        return `Ce champ ne doit contenir que des lettres`;
      case 'hasOnlyNumber':
        return `Ce champ ne doit contenir que des chiffres`;
      case 'noPunctuation':
        return `Ponctuation interdite`;
      case 'size':
        return `La taille du fichier doit faire moins de {valeur} Mo`;
      case 'regexp':
        return `Champ invalide`;
      case 'phone':
        return `Numéro de téléphone invalide. Exemple de formatage attendu : 0901020304 ou +33901020304`;
      case 'mobilePhone':
        return `Numéro de téléphone portable invalide. Exemple de formatage attendu : 0601020304 ou +33601020304`;
      case 'beforeToday':
        return `Vous devez indiquer une date inférieure à la date d'aujourd'hui`;
      case 'afterToday':
        return `Vous devez indiquer une date supérieure à la date d'aujourd'hui`;
      case 'notWeekends':
        return `Vous devez indiquer une date différente d'un week-end`;
      case 'notPublicHoliday':
        return `Vous devez indiquer une date différente d'un jour férié`;
      case 'checked':
        return `La case {valeur} doit être cochée`;
      case 'unchecked':
        return `La case {valeur} ne doit pas être cochée`;
      case 'socialSecurityNumber':
        return `Numéro de sécurité sociale invalide. Attention, seuls 13 ou 15 chiffres sont acceptés`;
      case 'resultId':
        return `La valeur doit être un code dossier valide`;
      case 'date':
        return `La date est invalide`;
      default:
        console.log(type, 'default !!!!!');
        return `Champ invalide`;
    }
  }

  // Return a rule for validation or action purpose
  //
  // If allowEmptyValue option is true, when a question has an empty value, the rule won't emit error. This option is useful for validation :
  // Ex: Take an input not required, with an "email" validation rule. When it is touched, and leaved empty, it shouldn't emit error
  // It is useful to disable this behavior :
  // Ex: Take an input with an "equal" action rule. Before it is touched, it should emit error, to avoid the action to activate
  public getRule(rule: ActionRule | ValidationRule, question: Question, options: { result?: boolean, allowEmptyValue?: boolean } = {}): ValidatorFn {
    switch (rule.type) {
      case 'email':
        return this.email(rule.errorPattern, options);
      case 'notEmpty':
        return this.notEmpty(rule.errorPattern, options);
      case 'notOnlyWhitespaces':
        return this.notOnlyWhitespaces();
      case 'contain':
        return this.contain(rule.value, rule.errorPattern, options);
      case 'notContain':
        return this.notContain(rule.value, rule.errorPattern, options);
      case 'hasLetter':
        return this.customPattern(/[a-zA-Z]/, rule.errorPattern, rule.type, options);
      case 'hasOnlyLetter':
        return this.customPattern(/^[a-zA-Z]+$/, rule.errorPattern, rule.type, options);
      case 'hasNumber':
        return this.customPattern(/[0-9]/, rule.errorPattern, rule.type, options);
      case 'hasOnlyNumber':
        return this.customPattern(/^[0-9]+$/, rule.errorPattern, rule.type, options);
      case 'minLength':
        return this.minLength(+rule.value, rule.errorPattern, options);
      case 'maxLength':
        return this.maxLength(+rule.value, rule.errorPattern, options);
      case 'equal':
        return this.equal(rule.value, rule.errorPattern, options);
      case 'different':
        return this.different(rule.value, rule.errorPattern, options);
      case 'maxDecimal':
        return this.maxDecimal(+rule.value, rule.errorPattern, options);
      case 'higher':
        return this.higher(rule.value, rule.errorPattern, question, options);
      case 'higherOrEqual':
        return this.higherOrEqual(rule.value, rule.errorPattern, question, options);
      case 'lower':
        return this.lower(rule.value, rule.errorPattern, question, options);
      case 'lowerOrEqual':
        return this.lowerOrEqual(rule.value, rule.errorPattern, question, options);
      case 'url':
        return this.url(rule.errorPattern, options);
      case 'checked':
        return this.checked(rule.value, rule.errorPattern, options.result ? question : null, options);
      case 'unchecked':
        return this.unchecked(rule.value, rule.errorPattern, options.result ? question : null, options);
      case 'allChecked':
        return this.allChecked((question.values || []).length, rule.errorPattern, options);
      case 'checkEqual':
        return this.checkEqual(rule.value, rule.errorPattern, options);
      case 'nocheckEqual':
        return this.nocheckEqual(rule.value, 0, rule.errorPattern, options);
      case 'checkMore':
        return this.checkMore(rule.value, rule.errorPattern, options);
      case 'checkLess':
        return this.checkLess(rule.value, rule.errorPattern, options);
      case 'nocheck':
        return this.nocheck;
      case 'noSpaces':
        return this.customPattern(/^((?! ).)*$/, rule.errorPattern, rule.type, options);
      case 'date':
        return this.date(rule.value + '', rule.errorPattern, options);
      case 'noPunctuation':
        return this.customPattern(/^((?!.|,|\?|!|;|_|:|-|\(|\)|\[|]|{|}|<|>|\/|\\).)*$/, rule.errorPattern, rule.type, options);
      case 'regexp':
        return this.regexp(rule.value, rule.errorPattern, options);
      case 'phone':
        return this.phone(rule.errorPattern, options);
      case 'mobilePhone':
        return this.mobilePhone(rule.errorPattern, options);
      case 'socialSecurityNumber':
        return this.socialSecurityNumber(rule.errorPattern, options);
      case 'resultId':
        return this.resultId(rule.errorPattern, options);
      case 'beforeToday':
        return this.beforeToday(rule.errorPattern, options);
      case 'afterToday':
        return this.afterToday(rule.errorPattern, options);
      case 'notWeekends':
        return this.notWeekends(rule.errorPattern, options);
      case 'notPublicHoliday':
        return this.notPublicHoliday(rule.errorPattern, options);
      case 'format':
        return this.unchecked(rule.value, rule.errorPattern, options.result ? question : null);
      default:
        console.warn(`Validator ${rule.type} not implemented !`);
    }
  }

  public email(errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('email');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const regExp = /^\S+@\S+$/;
      if (!regExp.test(formControl.value)) {
        return {email: {valid: false, pattern}};
      }

      return null;
    };
  }

  public minLength(value: number, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('minLength');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const fieldValue = formControl.value + '';
      if (fieldValue.length < value) {
        return {minLength: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public maxLength(value: number, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('maxLength');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const fieldValue = formControl.value + '';
      if (fieldValue.length > value) {
        return {maxLength: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public date(value: string, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('date');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const regExp = /^\d{4}-\d{2}-\d{2}$/; // Check YYYY-MM-DD format
      if (!regExp.test(formControl.value)) {
        return {date: {valid: false, value, pattern}};
      }

      const date = Date.parse(formControl.value);
      if (Global.isNaN(date)) {
        return {date: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public equal(value: string | number, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('equal');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      if (('' + formControl.value) !== ('' + value)) {
        return {equal: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public different(value: string | number, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('different');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      if (('' + formControl.value) === ('' + value)) {
        return {different: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public maxDecimal(value: string | number, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('maxDecimal');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      if (isNaN(+formControl.value) || isNaN(+value)) {
        return null;
      }

      const split = (formControl.value + '').split('.');
      if (!split[1]) {
        return null;
      }

      if (split[1].length > +value) {
        return {maxDecimal: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public contain(value: string | number, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('contain');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      if (!formControl.value || formControl.value.indexOf(value) === -1) {
        return {contain: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public regexp(value: string | number, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('regexp');
    const regexp = new RegExp(value + '');
    return this.customPattern(regexp, pattern, 'regexp', options);
  }

  public notEmpty(errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('notEmpty');

    return (formControl: FormControl) => {
      const isEmpty = Global.isEmpty(formControl.value);
      if (isEmpty) {
        return {notEmpty: {valid: false, pattern}};
      }

      return null;
    };
  }

  public notOnlyWhitespaces(): ValidatorFn {
    return (formControl: FormControl) => {
      let isEmpty;

      try {
        isEmpty = (formControl.value.trim() === '');
      } catch {
        return null; // If trim not available (eg: numbers), then skip
      }

      if (isEmpty) {
        return {required: {valid: false}};
      }

      return null;
    };
  }

  public notContain(value: string | number, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('notContain');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      if (formControl.value && formControl.value.indexOf(value) >= 0) {
        return {notContain: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public higher(value: string | number, errorPattern: string, question: Question, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('higher');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      if (question.type === 'date') {
        const fieldValue = new Date(formControl.value).getTime();
        const ruleValue = new Date(value).getTime();

        if (isNaN(fieldValue) || isNaN(ruleValue) || fieldValue <= ruleValue) {
          return {higher: {valid: false, value, pattern}};
        }
      } else {
        if (Global.isNaN(formControl.value) || Global.isNaN(value) || +formControl.value <= +value) {
          return {higher: {valid: false, value, pattern}};
        }
      }

      return null;
    };
  }

  public higherOrEqual(value: string | number, errorPattern: string, question: Question, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('higherOrEqual');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      if (question.type === 'date') {
        const fieldValue = new Date(formControl.value).getTime();
        const ruleValue = new Date(value).getTime();

        if (isNaN(fieldValue) || isNaN(ruleValue) || +fieldValue < +ruleValue) {
          return {higherOrEqual: {valid: false, value, pattern}};
        }
      } else {
        if (Global.isNaN(formControl.value) || Global.isNaN(value) || +formControl.value < +value) {
          return {higherOrEqual: {valid: false, value, pattern}};
        }
      }

      return null;
    };
  }

  public lower(value: string | number, errorPattern: string, question: Question, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('lower');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      if (question.type === 'date') {
        const fieldValue = new Date(formControl.value).getTime();
        const ruleValue = new Date(value).getTime();

        if (isNaN(fieldValue) || isNaN(ruleValue) || +fieldValue >= +ruleValue) {
          return {lower: {valid: false, value, pattern}};
        }
      } else {
        if (Global.isNaN(formControl.value) || Global.isNaN(value) || +formControl.value >= +value) {
          return {lower: {valid: false, value, pattern}};
        }
      }

      return null;
    };
  }

  public lowerOrEqual(value: string | number, errorPattern: string, question: Question, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('lowerOrEqual');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      if (question.type === 'date') {
        const fieldValue = new Date(formControl.value).getTime();
        const ruleValue = new Date(value).getTime();

        if (isNaN(fieldValue) || isNaN(ruleValue) || +fieldValue > +ruleValue) {
          return {lowerOrEqual: {valid: false, value, pattern}};
        }
      } else {
        if (Global.isNaN(formControl.value) || Global.isNaN(value) || +formControl.value > +value) {
          return {lowerOrEqual: {valid: false, value, pattern}};
        }
      }

      return null;
    };
  }

  public url(errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('url');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const regExp = /^https?:\/\/.*$/;
      if (!regExp.test(formControl.value)) {
        return {url: {valid: false, pattern}};
      }

      return null;
    };
  }

  public checked(value: string | number, errorPattern: string, question?: any, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('checked');

    if (question) {
      return (formControl: FormControl) => {
        if (!(question.name === value && formControl.value)) {
          return {checked: {valid: false, value, pattern}};
        }
      };
    }

    return (formControl: FormControl) => {
      let error;

      if (!options.allowEmptyValue && (Global.isEmpty(formControl.value) || formControl.value === undefined)) {
        error = true;
      }

      if (typeof formControl.value === 'string' && formControl.value !== value) {
        error = true;
      }

      if (Array.isArray(formControl.value) && formControl.value.indexOf(value) === -1) {
        error = true;
      }

      if (error) {
        return {checked: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public unchecked(value: string | number, errorPattern: string, question?: any, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('unchecked');

    if (question) {
      return (formControl: FormControl) => {
        if (!(question.name === value && !formControl.value)) {
          return {unchecked: {valid: false, value, pattern}};
        }
      };
    }

    return (formControl: FormControl) => {
      let error;

      if (!options.allowEmptyValue && (Global.isEmpty(formControl.value) || formControl.value === undefined)) {
        error = true;
      }

      if (typeof formControl.value === 'string' && formControl.value === value) {
        error = true;
      }

      if (Array.isArray(formControl.value) && formControl.value.indexOf(value) >= 0) {
        error = true;
      }

      if (error) {
        return {unchecked: {valid: false, value, pattern}};
      }
    };
  }

  public allChecked(value: string | number, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('allChecked');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const nbAnswers = (formControl.value || []).length;

      if (typeof formControl.value !== typeof [] || value !== nbAnswers) {
        return {allChecked: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public checkEqual(value: string | number, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('checkEqual');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const nbOptions = +value;
      const nbAnswers = (formControl.value || []).length;

      if (typeof formControl.value !== typeof [] || nbOptions !== nbAnswers) {
        return {checkEqual: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public nocheckEqual(value: string | number, questionOptions, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('nocheckEqual');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const nbOptions = +value;
      const nbAnswers = questionOptions - formControl.value.length;

      if (typeof formControl.value !== typeof [] || nbOptions !== nbAnswers) {
        return {nocheckEqual: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public checkMore(value: string | number, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('checkMore');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const nbOptions = +value;
      const nbAnswers = formControl.value.length;

      if (typeof formControl.value !== typeof [] || nbOptions > nbAnswers) {
        return {checkMore: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public checkLess(value: string | number, errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('checkLess');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const nbOptions = +value;
      const nbAnswers = formControl.value.length;

      if (typeof formControl.value !== typeof [] || nbOptions < nbAnswers) {
        return {checkLess: {valid: false, value, pattern}};
      }

      return null;
    };
  }

  public nocheck(formControl: FormControl, options: { allowEmptyValue?: boolean } = {}): any {
    if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
      return null;
    }

    if (typeof formControl.value !== typeof [] || formControl.value.length !== 0) {
      return {nocheck: {valid: false}};
    }

    return null;
  }

  public disallowedCaracters(disallowed: string[]): ValidatorFn {
    return (formControl: FormControl) => {
      const value = formControl.value || '';
      for (const term of disallowed) {
        if (value.indexOf(term) >= 0) {
          return {disallowedCaracters: {valid: false, term}};
        }
      }

      return null;
    };
  }

  public customPattern(regexp: RegExp, errorPattern: string, type: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern(type);

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      if (!regexp.test(formControl.value)) {
        return {[errorPattern]: {valid: false, pattern}};
      }

      return null;
    };
  }

  public phone(errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('phone');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      // with spaces allowed : /^(0|\+33[ ]?)[1-9]([-. ]?[0-9]{2}){4}$/
      const regExp = /^(0|\+33)[1-9]([0-9]{2}){4}$/;
      if (!regExp.test(formControl.value)) {
        return {phone: {valid: false, pattern}};
      }

      return null;
    };
  }

  public mobilePhone(errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('mobilePhone');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      // with spaces allowed : /^(0|\+33[ ]?)[1-9]([-. ]?[0-9]{2}){4}$/
      const regExp = /^(0|\+33)[6-7]([0-9]{2}){4}$/;
      if (!regExp.test(formControl.value)) {
        return {phone: {valid: false, pattern}};
      }

      return null;
    };
  }

  public socialSecurityNumber(errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('socialSecurityNumber');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      // Match 13 or 15 characters
      const regExp = /^[1-478]\d{12}(\d{2})?$/;
      if (!regExp.test(formControl.value)) {
        return {socialSecurityNumber: {valid: false, pattern}};
      }

      return null;
    };
  }

  public resultId(errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('resultId');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const regExp = /^\d{2}[A-Z]\d{6}$/;
      if (!regExp.test(formControl.value)) {
        return {resultId: {valid: false, pattern}};
      }

      return null;
    };
  }

  public beforeToday(errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('beforeToday');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const currentDate = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
      const date = moment(formControl.value);

      if (currentDate.diff(date, 'days', true) < 0) {
        return {beforeToday: {valid: false, pattern}};
      }

      return null;
    };
  }

  public afterToday(errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('afterToday');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const currentDate = moment().hours(0).minutes(0).seconds(0).milliseconds(0);
      const date = moment(formControl.value);

      if (currentDate.diff(date, 'days', true) > 0) {
        return {afterToday: {valid: false, pattern}};
      }

      return null;
    };
  }

  public notWeekends(errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('notWeekends');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const date = moment(formControl.value);

      if (date.isoWeekday() >= 6) {
        return {notWeekends: {valid: false, pattern}};
      }

      return null;
    };
  }

  public notPublicHoliday(errorPattern: string, options: { allowEmptyValue?: boolean } = {}): ValidatorFn {
    const pattern = errorPattern || this.getErrorPattern('notPublicHoliday');

    return (formControl: FormControl) => {
      if (options.allowEmptyValue && Global.isEmpty(formControl.value)) {
        return null;
      }

      const date = moment(formControl.value);
      const dateValue = date.format('YYYY-MM-DD');

      if (this.publicHolidays[dateValue]) {
        return {notPublicHoliday: {valid: false, pattern}};
      }

      return null;
    };
  }
}
