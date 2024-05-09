import React from 'react';
import AtomContainer from '../atoms/AtomContainer';
import AtomButton from '../atoms/AtomButton';
import Image from 'next/image';

/**
 * Component representing the hero section on the home page.
 * Displays a title, a call-to-action button, and an image.
 */
const MoleculesHomeHero = () => {
  return (
    <AtomContainer>
      <div className="flex">
        <div className="lg:flex-grow lg:w-1/2 flex flex-col lg:items-start lg:text-left mb-3 md:mb-12 lg:mb-0 items-center text-center">
          <p className="mb-8 leading-relaxed font-semibold text-sm text-green-600">
            FREE 30 DAY TRIAL
          </p>
          <h1 className="title-font sm:text-5xl lg:text-6xl text-4xl mb-8 font-semibold sm:leading-tight">
            Simple todo list app
            <br className="lg:block hidden" />
            to organize your needs
          </h1>
          <div className="inline-block items-center mx-auto lg:mx-0 lg:flex justify-center lg:space-x-8 md:space-x-2 sm:space-x-3 space-x-0">
            <AtomButton to="/demo" color="primary">
              TRY FOR FREE
            </AtomButton>
          </div>
        </div>
        <div className="w-full lg:w-1/2 text-center lg:justify-end justify-center flex pr-0">
          <Image alt="hero" src={`/home-hero.png`} width={500} height={361} />
        </div>
      </div>
    </AtomContainer>
  );
};

export default MoleculesHomeHero;
