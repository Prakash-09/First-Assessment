import ServiceConstants from './ServiceConstants';
import { requestHandler } from './RequestHandler';

export const pageDataService = {
    getSections, getSection, updateSection
};

function getSections() {
    return requestHandler.fetchPagination(`${ServiceConstants.HOST_ACCESSHEALTH}/api/Sections`)
}

function getSection(SectionId) {
    return requestHandler.fetch(`${ServiceConstants.HOST_ACCESSHEALTH}/api/Sections/${SectionId}`)
}

function updateSection(Section) {
    return requestHandler.update(`${ServiceConstants.HOST_ACCESSHEALTH}/api/Sections/${Section.id}`, Section);
}