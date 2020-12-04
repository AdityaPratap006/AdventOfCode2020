import fs from 'fs';
import path from 'path';

const getInput = async (): Promise<Record<string, string>[]> => {
    const input = await fs.promises.readFile(path.join(__dirname, "../../inputs/day4/input.txt"), "utf8");
    return input.split("\n\n").map((line) => {
        // console.log(line.replace(/\n/g, " ").split(" "));
        return Object.fromEntries(
            line.replace(/\n/g, " ").split(" ").map((v) => v.split(":"))
        );
    });
};

const checkValidity = (document: Record<string, string>) => {
    let isValid = false;

    if (Object.entries(document).length < 7) {
        isValid = false;
    } else {
        const { iyr, ecl, hgt, pid, byr, hcl, eyr } = document;
        isValid = !!(iyr && ecl && hgt && pid && byr && hcl && eyr);
    }

    return isValid;
}

const solutionPart1 = async () => {

    let validPassportCount = 0;

    const input = await getInput();

    input.forEach(doc => {
        if (checkValidity(doc)) {
            ++validPassportCount;
        }
    })

    console.log(`Valid Passports: ${validPassportCount}`);
    return validPassportCount;
}

const checkYear = (yearString: string, min: number, max: number) => {
    const year = parseInt(yearString);

    if (year < min) {
        return false;
    } else if (year > max) {
        return false;
    } else {
        return true;
    }
}

const checkHeight = (heightString: string) => {
    const regexpHeight = /^\d+(cm|in)$/;

    if (!regexpHeight.test(heightString)) {
        return false;
    }

    const magnitude = parseInt(heightString.replace(/(cm|in)/, ''));
    const unit = heightString.replace(/^\d+/, '');

    if (unit == 'cm') {
        return magnitude >= 150 && magnitude <= 193;
    } else if (unit == 'in') {
        return magnitude >= 59 && magnitude <= 76;
    }

    return false;
}

const checkHairColor = (hcl: string) => {
    const regexpColor = /#([0-9]|[a-f]){6}$/;

    return regexpColor.test(hcl);
}

const checkEyeColor = (ecl: string) => {
    const regexpColor = /(amb|blu|brn|gry|grn|hzl|oth)$/;
    return regexpColor.test(ecl);
}

const checkPid = (pid: string) => {
    const regexpPid = /^([0-9]){9}$/;
    return regexpPid.test(pid);
}

const checkValidityStrict = (document: Record<string, string>) => {
    if (!checkValidity(document)) {
        return false;
    }

    const { iyr, ecl, hgt, pid, byr, hcl, eyr } = document;

    const validBirthYear = checkYear(byr, 1920, 2002);
    const validIssueYear = checkYear(iyr, 2010, 2020);
    const validExpirationYear = checkYear(eyr, 2020, 2030);
    const validHeight = checkHeight(hgt);
    const validHairColor = checkHairColor(hcl);
    const validEyeColor = checkEyeColor(ecl);
    const validPid = checkPid(pid);

    return (
        validBirthYear && validExpirationYear &&
        validIssueYear && validHeight &&
        validHairColor && validEyeColor &&
        validPid
    );
}

const solutionPart2 = async () => {
    let validPassportCount = 0;

    const input = await getInput();

    input.forEach(doc => {
        if (checkValidityStrict(doc)) {
            ++validPassportCount;
        }
    })

    console.log(`Valid Passports: ${validPassportCount}`);
    return validPassportCount;
}

export const solution = async () => {
    console.log(`--- part: 1 ---`);
    await solutionPart1();

    console.log(`--- part: 2 ---`);
    await solutionPart2();
}