import female_hero from './female-hero.png';
import female_mage from './female-mage.png';
import female_warrior from './female-warrior.png';
import male_hero from './male-hero.png';
import male_mage from './male-mage.png';
import male_warrior from './male-warrior.png';

import ICharacterImg from '@/interface/ICharacterImg';

const Character: ICharacterImg = {
  female: {
    hero: female_hero as string,
    mage: female_mage as string,
    warrior: female_warrior as string
  },
  male: {
    hero: male_hero as string,
    mage: male_mage as string,
    warrior: male_warrior as string
  }
};

export default Character;